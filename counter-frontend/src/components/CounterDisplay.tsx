import { useEffect, useCallback, useState } from "react";
import { AnchorHelper } from "../anchor/setup";
import {
  AnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";

export const CounterDisplay: React.FC = () => {
  const [counterData, setCounterData] = useState<CounterData | null>(null);
  const { connection } = useConnection();
  const wallet = useWallet();

  // Only create provider and program if wallet is connected
  const provider =
    wallet && connection
      ? new AnchorProvider(connection, wallet as AnchorWallet, {
          commitment: "confirmed",
        })
      : null;

  const program =
    provider && wallet && connection ? AnchorHelper.getProgram(provider) : null;
  const counterPDA =
    provider && wallet && connection
      ? AnchorHelper.getCounterPDA(provider)
      : null;

  // Fetch counter data
  const fetchCounterData = useCallback(async () => {
    if (!program || !counterPDA || !!counterData) return;
    try {
      const data = await program.account.counter.fetch(counterPDA);
      setCounterData(data);
    } catch (error) {
      console.error("Error fetching counter data:", error);
    }
  }, [program, counterPDA]);

  useEffect(() => {
    fetchCounterData();
  }, [fetchCounterData]);

  useEffect(() => {
    if (!program || !counterPDA || !connection) return;

    // Subscribe to account change
    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        if (program) {
          setCounterData(
            program.coder.accounts.decode("counter", accountInfo.data),
          );
        }
      },
    );

    return () => {
      // Unsubscribe from account change
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection, counterPDA, program]);

  const onIncrementCounter = async () => {
    if (!program || !wallet.publicKey || !counterPDA) return;
    try {
      const tx = await program.methods
        .increement()
        .accounts({
          counter: counterPDA,
          user: wallet.publicKey,
        })
        .rpc();
      console.log("Increment successful!", tx);
    } catch (err) {
      console.error("Increment failed!", err);
    }
  };

  const onDecrementCounter = async () => {
    if (!program || !wallet.publicKey || !counterPDA) return;
    try {
      const tx = await program.methods
        .decreement()
        .accounts({
          counter: counterPDA,
          user: wallet.publicKey,
        })
        .rpc();
      console.log("Decrement successful!", tx);
    } catch (err) {
      console.error("Decrement failed!", err);
    }
  };

  // Show nothing if wallet is not connected
  if (!wallet.connected) {
    return null;
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-3">
      <button
        onClick={onDecrementCounter}
        type="button"
        className="btn btn-danger"
      >
        -
      </button>
      <div className="px-4 display-5">{counterData?.count ?? 0}</div>
      <button
        type="button"
        onClick={onIncrementCounter}
        className="btn btn-success"
      >
        +
      </button>
    </div>
  );
};
