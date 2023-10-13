#include <solana_sdk.h>

struct ProjectDetails{
    char name[64],
    char description[2048],
    uint64_t amount,
    char creation_date[64],
}

extern uint64_t create_project(SolParameters *params){
    if (params->ka_num != 1){
        return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
    }
    
    SolAccountInfo *source_info = &params->ka[0];

    if (source_info->owner != &params->program_id){
        return ERROR_INCORRECT_PROGRAM_ID;
    }

    struct ProjectDetails *project_details = (struct ProjectDetails *)params->data;

    uint8_t data[sizeof(struct ProjectDetails)];
    memcpy(data, &project_details, sizeof(struct ProjectDetails));

    SolAccountMeta arguments[] = {{ source_info->owner, true, true }};

    const SolSignerSeed seeds[] = {{seed, SOL_ARRAY_SIZE(seed)},
                                 {&params->data[0], 1}};

    const SolSignerSeeds signers_seeds[] = {{seeds, SOL_ARRAY_SIZE(seeds)}};

    const SolInstruction instruction = {system_program_info->key, arguments,
                                      SOL_ARRAY_SIZE(arguments), data,
                                      SOL_ARRAY_SIZE(data)};

    return sol_invoke_signed(&instruction, params->ka, params->ka_num,
                           signers_seeds, SOL_ARRAY_SIZE(signers_seeds));
}



extern uint64_t entrypoint(const uint8_t *input) {
  SolAccountInfo accounts[1];
  SolParameters params = (SolParameters){.ka = accounts};
  
  if (!sol_deserialize(input, &params, SOL_ARRAY_SIZE(accounts))) {
    return ERROR_INVALID_ARGUMENT;
  }

  return create_project(&params);
}