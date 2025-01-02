import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CounterDisplay } from "./CounterDisplay";
import { useWallet } from "@solana/wallet-adapter-react";

export const Home: React.FC = () => {
  const wallet = useWallet();

  return (
    <div className="text-center my-5 py-5">
      <WalletMultiButton />
      <div className="mt-3 display-3 text-white">Solana Counter</div>
      {wallet.connected && <CounterDisplay />}
    </div>
  );
};
