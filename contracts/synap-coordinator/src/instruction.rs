use {
    borsh::{BorshSerialize, BorshDeserialize},
};

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize)]
pub enum SynapIntruction {

    // -> Bidding
    CreateProject,

    // Requires state Bidding
    BidProject,

    // Bidding -> Closed
    SelectBid,

    // Creates an action proposal.
    CreateAction {
        action: Action,
    },

    // If the project is not in conflict mode, the signatures must be
    // the requester and developer, otherwise, the signatures must be
    // the required percentage of the validators
    SignAction {
    },

    // Activates a flag in the project state.
    // The conflict flag lets the validators make a decision.
    RaiseConflict {
    },

    // A validator can leave a project by his own decision
    ValidatorLeave {
    },
}

