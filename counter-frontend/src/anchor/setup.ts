import { IdlAccounts, Program, Provider } from "@coral-xyz/anchor";
import { IDL, Counter } from "./idl";
import { Buffer } from "buffer";
import { PublicKey } from "@solana/web3.js";

export class AnchorHelper {
  // Initialize the program interface with the IDL, program ID, and connection.
  // This setup allows us to interact with the on-chain program using the defined interface.
  public static getProgram = (provider: Provider) =>
    new Program<Counter>(IDL, provider);

  // Derive a PDA for the counter account, using "counter" as the seed.
  // We'll use this to update the counter on-chain.

  public static getCounterPDA = (provider: Provider) => {
    const [counterPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      AnchorHelper.getProgram(provider).programId,
    );

    return counterPDA;
  };
}

// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
export type CounterData = IdlAccounts<Counter>["Counter"];
