import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Home: React.FC = () => {
  return (
    <div className="text-center my-5 py-5">
      <WalletMultiButton />
      <div className="mt-3 display-3 text-white">Solana</div>
    </div>
  );
};
