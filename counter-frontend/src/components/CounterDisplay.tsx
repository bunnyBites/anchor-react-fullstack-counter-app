import { useEffect, useState } from "react";
import { CounterData, counterPDA, program } from "../anchor/setup";
import { useConnection } from "@solana/wallet-adapter-react";

export const CounterDisplay: React.FC = () => {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);
  console.log(counterData);

  useEffect(() => {
    // Fetch initial account data
    program.account.counter.fetch(counterPDA).then((data) => {
      setCounterData(data);
    });

    // Subscribe to account change
    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        setCounterData(
          program.coder.accounts.decode("counter", accountInfo.data),
        );
      },
    );

    return () => {
      // Unsubscribe from account change
      connection.removeAccountChangeListener(subscriptionId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  return (
    <div className="d-flex align-items-center justify-content-center py-3">
      <button type="button" className="btn btn-danger">
        -
      </button>
      <div className="px-4 display-5">{counterData?.count}</div>
      <button type="button" className="btn btn-success">
        +
      </button>
    </div>
  );
};
