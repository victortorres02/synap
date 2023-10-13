#include <solana_sdk.h>
#include <string.h>

typedef struct {
	int32_t numerator;
	uint32_t denominator;
} Fraction;

typedef struct {
    char name[64];
    char description[2048];
    uint64_t amount;
    char creation_date[64];
    SolPubkey owner, developer;
    Fraction validator_needed_percentage;
    uint8_t state;
    bool conflict;
    uint8_t num_validators;
    SolPubkey validators[];
} ProjectDetails;

// ** Arguments for the contract actions **
typedef struct {
    uint64_t amount;
    SolPubkey bidder;
} BidInfo;

typedef struct {
	uint64_t owner_pay, developer_pay, validator_pay;
} FinishProposal;

// ** Project temporal state structs **
typedef struct {
    uint8_t num_bidders;
    BidInfo bidders[];
} BidState;


// ** enums **
enum ProjectState {
	StateOpen,
	StateBidding,
	StateClosed,
	StateFinished,
};

enum ActionId {
	ActCreateProject,
	ActAbortProject,
	ActAcceptVerificatorRole,
	ActBeginBid,
	ActSelectBid,
	ActCreateProposal,
	ActSignProposal,
	ActBeginConflict,
};


const uint8_t init_seed[] = {'s', 'y', 'n', 'a', 'p', 's', 'i', 's', 's', 'e', 'e', 'd', };
const uint8_t valbits_seed[] = {'s', 'y', 'n', 'a', 'p', '_', 's', 't', 'a', 't', 'e', '!', };

// Checks that all verifiers have signed
bool check_all_verifiers_accepted(const uint8_t* data, size_t size)
{
	for (size_t i=0; i < size; ++i)
		if (!(data[i/8]&(1<<(i%8))))
			return false;
	return true;
}

// Checks that at least the required amount of verifiers have signed the proposal
bool check_needed_validators_accepted(const uint8_t *data, size_t size, Fraction req)
{
	size_t count=0;
	uint64_t needed = (uint64_t)size*req.numerator/req.denominator;

	for (size_t i=0; i < size; ++i)
		if (data[i/8]&(1<<(i%8)))
			if (++count >= needed)
				return true;

	return false;
}

// Creates a project
extern uint64_t create_project(SolParameters *params){
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }
    
    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pr = &params->ka[3];

    if (pr->data_len < sizeof(ProjectDetails))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_proposal = (ProjectDetails*)pr->data;

    if (!SolPubkey_same(pr->owner, &project_proposal->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (project_proposal->num_validators*sizeof(SolPubkey) + sizeof(ProjectDetails) < pr->data_len)
    {
	    return ERROR_INVALID_ARGUMENT;
    }

    if (project_proposal->num_validators >= 253)
	    return ERROR_INVALID_ARGUMENT;

    SolAccountMeta arguments[] = {{ source_info->owner, true, true }};

    SolSignerSeeds signers_seeds = {init_seed, SOL_ARRAY_SIZE(init_seed)};

    SolInstruction instruction = {source_info->key, arguments,
                                      SOL_ARRAY_SIZE(arguments), project_proposal,
                                      sizeof(ProjectDetails) + sizeof(SolPubkey)*project_proposal->num_validators};

    // ProjectDetails account
    if (sol_invoke_signed(&instruction, params->ka, params->ka_num,
                           &signers_seeds, 1) != SUCCESS)
	    return ERROR_INVALID_ARGUMENT;

    signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    size_t bits_len = (project_proposal->num_validators+7)/8;
    void* bits = sol_calloc(bits_len, 1);

    instruction = (SolInstruction) {source_info->key, arguments,
	    SOL_ARRAY_SIZE(arguments), bits,
	    bits_len};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                           &signers_seeds, 1);
}

// A verifier accepts the role in the project
extern uint64_t accept_ver_role(SolParameters *params) {
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }
    
    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *state = &params->ka[2];
    SolAccountInfo *signature = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (!SolPubkey_same(source_info->owner, state->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (project_details->state != StateOpen)
	    return ERROR_INVALID_ARGUMENT;

    if (signature->data_len < sizeof(uint8_t))
	    return ERROR_INVALID_ARGUMENT;

    uint8_t index = *signature->data;

    if (index >= project_details->num_validators)
	    return ERROR_INVALID_ARGUMENT;

    if (!SolPubkey_same(signature->owner, &project_details->validators[index])){
        return ERROR_INVALID_ARGUMENT;
    }

    state->data[index/8] |= 1 << (index%8);

    if (!check_all_verifiers_accepted(state->data, project_details->num_validators))
    {
	    // there is still unconfirmed verifiers
	    SolAccountMeta arguments[] = {{ source_info->owner, true, true }};

	    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

	    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
		    SOL_ARRAY_SIZE(arguments), state->data,
		    state->data_len};

	    // temporary validator state
	    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
					   &signers_seeds, 1);
    }
    else
    {
	    // Once all verifiers have accepted the projects moves into the bidding state
	    project_details->state = StateBidding;

	    SolAccountMeta arguments[] = {{ source_info->owner, true, true }};

	    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

	    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
		    SOL_ARRAY_SIZE(arguments), state->data,
		    0};

	    // temporary validator state
	    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
					   &signers_seeds, 1);
    }
}

// a developer submits a project budget and it is recorded in the temp state
extern uint64_t submit_bid(SolParameters *params){
    if(params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }

    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *state = &params->ka[2];
    SolAccountInfo *info = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (!SolPubkey_same(source_info->owner, state->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (project_details->state != StateBidding)
        return ERROR_INVALID_ARGUMENT;

    BidState *bid_state = (BidState*)state->data;

    if (bid_state->num_bidders == 255){
        return ERROR_INVALID_ARGUMENT;
    }

    if (info->data_len < sizeof(BidInfo))
	    return ERROR_INVALID_ARGUMENT;

    BidInfo *bid_info = (BidInfo*)info->data;

    if (!SolPubkey_same(info->owner, &bid_info->bidder))
	    return ERROR_INVALID_ARGUMENT;

    void* new_state = sol_calloc((++bid_state->num_bidders) * sizeof(BidInfo), 1);
    sol_memcpy(bid_state, new_state, (bid_state->num_bidders - 1) * sizeof(BidInfo));

    sol_memcpy(bid_info, new_state+(bid_state->num_bidders - 1) * sizeof(BidInfo), sizeof(BidInfo));

    SolAccountMeta arguments[] = {{ params->ka[0].owner, true, true }};

    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
        SOL_ARRAY_SIZE(arguments), new_state,
        bid_state->num_bidders * sizeof(BidInfo)};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                    &signers_seeds, 1);
}

// the project owner selects a bid from the bid list
extern uint64_t select_bid(SolParameters *params){
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }

    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *state = &params->ka[2];
    SolAccountInfo *selected_bidder = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (!SolPubkey_same(source_info->owner, state->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (project_details->state != StateBidding) {
        return ERROR_INVALID_ARGUMENT;
    }

    if (!SolPubkey_same(selected_bidder->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    project_details->state = StateClosed;

    project_details->developer = *selected_bidder->key;

    SolAccountMeta arguments[] = {{ params->ka[0].owner, true, true }};

    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
        SOL_ARRAY_SIZE(arguments), state->data,
        state->data_len};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                    &signers_seeds, 1);
}

// if the owner and the developer don't come to a concensus, a conflict can be raised
// a raised conflict allows the verifiers to make a decision on the behalf of the owner
// and the developer
extern uint64_t begin_conflict(SolParameters *params){
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }

    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *signature = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (project_details->state != StateClosed) {
        return ERROR_INVALID_ARGUMENT;
    }

    if (!SolPubkey_same(signature->owner, &project_details->owner)
	&& !SolPubkey_same(signature->owner, &project_details->developer))
	    return ERROR_INVALID_ARGUMENT;

    project_details->conflict = true;

    SolAccountMeta arguments[] = {{ params->ka[0].owner, true, true }};

    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
        SOL_ARRAY_SIZE(arguments), &project_details,
        pj->data_len};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                    &signers_seeds, 1);
}

// creates a proposal
extern uint64_t create_proposal(SolParameters *params){
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }

    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *state = &params->ka[2];
    SolAccountInfo *signature = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (!SolPubkey_same(source_info->owner, state->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (project_details->state != StateClosed) {
        return ERROR_INVALID_ARGUMENT;
    }


    bool is_owner_or_dev = !SolPubkey_same(signature->owner, &project_details->owner)
	    && !SolPubkey_same(signature->owner, &project_details->developer);

    if (!is_owner_or_dev)
    {
	    bool found=false;
	    for (size_t i=0; i < project_details->num_validators; ++i)
		    if (SolPubkey_same(&project_details->validators[i], signature->owner))
		    {
			    found = true;
			    break;
		    }

	    if (!found)
		    return ERROR_INVALID_ARGUMENT;
    }

    if (state->data_len < sizeof(FinishProposal))
	    return ERROR_INVALID_ARGUMENT;

    FinishProposal *proposal=state->data;

    if (proposal->owner_pay + proposal->developer_pay + proposal->validator_pay != project_details->amount)
	    return ERROR_INVALID_ARGUMENT;

    size_t new_size = state->data_len + sizeof(FinishProposal) + 1 + (project_details->num_validators+7)/8;
    uint8_t *sigs = sol_calloc(new_size, 1);

    sol_memcpy(state->data, sigs, state->data_len);
    sol_memcpy(proposal, sigs + state->data_len, sizeof(FinishProposal));

    SolAccountMeta arguments[] = {{ params->ka[0].owner, true, true }};

    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
        SOL_ARRAY_SIZE(arguments), sigs,
        new_size};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                    &signers_seeds, 1);
}

// the owner, developer and verifier can sign a proposal
extern uint64_t sign_proposal(SolParameters *params){
    if (params->ka_num != 4){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }
    
    SolAccountInfo *source_info = &params->ka[0];
    SolAccountInfo *pj = &params->ka[1];
    SolAccountInfo *state = &params->ka[2];
    SolAccountInfo *signature = &params->ka[3];

    if (!SolPubkey_same(source_info->owner, pj->owner))
	    return ERROR_INVALID_ARGUMENT;

    ProjectDetails *project_details = (ProjectDetails*)pj->data;

    if (!SolPubkey_same(source_info->owner, state->owner))
	    return ERROR_INVALID_ARGUMENT;

    if (project_details->state != StateClosed) {
        return ERROR_INVALID_ARGUMENT;
    }

    if (signature->data_len < sizeof(uint8_t))
	    return ERROR_INVALID_ARGUMENT;

    uint8_t index = *(uint8_t*)signature->data;

    bool is_owner_or_dev = !SolPubkey_same(signature->owner, &project_details->owner)
	    && !SolPubkey_same(signature->owner, &project_details->developer);

    if (!is_owner_or_dev && !project_details->conflict)
	    return ERROR_INVALID_ARGUMENT;

    uint8_t *p = state->data;
    uint8_t *pp;
    size_t i=index+1;
    while (i != 0)
    {
	    --i;
	    pp = p;
	    p += sizeof(FinishProposal);
	    p += *p &1 ? 1 : 1 + (project_details->num_validators+7)/8;

	    if (p > state->data + state->data_len)
		    return ERROR_INVALID_ARGUMENT;
    }

    if (!is_owner_or_dev && *pp&1)
	    return ERROR_INVALID_ARGUMENT;

    if (is_owner_or_dev)
    {
	    *pp |= SolPubkey_same(signature->owner, &project_details->owner)?2:4;

	    if (*pp == 7)
		    goto do_proposal;
    }
    else 
    {
	    for (i=0; i < project_details->num_validators; ++i)
		    if (SolPubkey_same(&project_details->validators[i], signature->key))
		    {
			    pp[i/8] |= 1 << (i%8);
		    }

	    if (check_needed_validators_accepted(pp,
				    project_details->num_validators,
				    project_details->validator_needed_percentage))
		    goto do_proposal;
    }

    return ERROR_INVALID_ARGUMENT;

do_proposal:
    project_details->state = StateClosed;

    SolAccountMeta arguments[] = {{ params->ka[0].owner, true, true }};

    SolSignerSeeds signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    SolInstruction instruction = (SolInstruction) {source_info->key, arguments,
	    SOL_ARRAY_SIZE(arguments), project_details,
	    sizeof(ProjectDetails) + sizeof(SolPubkey)*project_details->num_validators};

    // temporary validator state
    if (sol_invoke_signed(&instruction, params->ka, params->ka_num,
				   &signers_seeds, 1) != SUCCESS)
	    return ERROR_INVALID_ARGUMENT;

    signers_seeds = (SolSignerSeeds){valbits_seed, SOL_ARRAY_SIZE(valbits_seed)};

    instruction = (SolInstruction) {source_info->key, arguments,
	    SOL_ARRAY_SIZE(arguments), state->data,
	    state->data_len};

    // temporary validator state
    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
				   &signers_seeds, 1);
}

extern uint64_t entrypoint(const uint8_t *input) {
  SolAccountInfo accounts[4];
  SolParameters params = (SolParameters){.ka = accounts};

  if (!sol_deserialize(input, &params, SOL_ARRAY_SIZE(accounts))) {
    return ERROR_INVALID_ARGUMENT;
  }

  if (params.ka_num < 1)
          return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;

  uint8_t action_id = *(uint8_t*)&params.ka[0];

  switch (action_id)
  {
	  case ActCreateProject:
		  return create_project(&params);
	  case ActAcceptVerificatorRole:
		  return accept_ver_role(&params);
	  case ActBeginBid:
		  return submit_bid(&params);
	  case ActSelectBid:
		  return select_bid(&params);
	  case ActCreateProposal:
		  return create_proposal(&params);
	  case ActSignProposal:
		  return sign_proposal(&params);
	  case ActBeginConflict:
		  return begin_conflict(&params);
	  default:
		  return ERROR_INVALID_ARGUMENT;
  }
}
