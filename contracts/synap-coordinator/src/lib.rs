use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

// declare and export the program's entrypoint
entrypoint!(process_instruction);
/*
open project
*/

pub struct ProjectDetails {
    pub name: String,
    pub description: String,
}

pub fn create_project(
    program_id: &Pubkey,
    account: &AccountInfo,
    details: ProjectDetails,
) -> Instruction {
    let accounts_iter = &mut accounts.iter();

    let project_owner = next_account_info(accounts_iter)?;

    if project_owner.owner != program.id {
        return Err(ProgramError::IncorrectProgramId)
    }

    let mut project_data = project_owner.try_borrow_mut_data()?;
    project_data.copy_from_slice(&details.serialize()?)?;

    let instruction = SynapInstruction::CreateProject;

    Instruction {
        program_id: *program_id,
        accounts,
        data: instruction.try_to_vec().unwrap(),
    }
}

// program entrypoint's implementation
pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    
}
