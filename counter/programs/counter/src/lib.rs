use anchor_lang::prelude::*;

declare_id!("9zdwm1viRGxFcdBCBUH2TV1fXb3GN5Vjfd7rs7ZiTVbf");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;
        counter_account.bump = ctx.bumps.counter;

        msg!(
            "The bump for the created counter account PDA is: {:?}",
            ctx.bumps.counter
        );
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn increement(ctx: Context<Update>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;
        counter_account.count += 1;

        msg!(
            "Successfully increemented the count: {}",
            counter_account.count
        );
        Ok(())
    }

    pub fn decreement(ctx: Context<Update>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;

        counter_account.count -= 1;

        msg!(
            "Successfully decreemented the count: {}",
            counter_account.count
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, seeds=[b"counter"], bump, payer = user, space = 8 + Counter::INIT_SPACE)]
    pub counter: Account<'info, Counter>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut, seeds=[b"counter"], bump=counter.bump)]
    pub counter: Account<'info, Counter>,

    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: i32,
    pub bump: u8,
}
