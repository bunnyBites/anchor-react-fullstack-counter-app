import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;

  const [counterPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    try {
      const tx = await program.methods
        .initialize()
        .accounts([counterPDA])
        .rpc();
      console.log("Your transaction signature", tx);
      const counterAccount = await program.account.counter.fetch(counterPDA);

      console.log("Count value: ", counterAccount.count);
    } catch (err) {
      console.log("Transaction failed!!", err.message);
    }
  });

  it("Is Increemented!", async () => {
    try {
      const tx = await program.methods
        .increement()
        .accounts([counterPDA])
        .rpc();

      console.log("Your transaction signature", tx);

      const counterAccount = await program.account.counter.fetch(counterPDA);
      console.log(counterAccount.count);
    } catch (err) {
      console.log("Transaction failed!!", err.message);
    }
  });

  it("Is Decreemented!", async () => {
    try {
      const tx = await program.methods
        .decreement()
        .accounts([counterPDA])
        .rpc();

      console.log("Your transaction signature", tx);

      const counterAccount = await program.account.counter.fetch(counterPDA);
      console.log(counterAccount.count);
    } catch (err) {
      console.log("Transaction failed!!", err.message);
    }
  });
});
