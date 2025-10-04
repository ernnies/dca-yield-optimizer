import { useState } from "react";
import { connectWallet, IAccount } from "../utils/massa";

interface WalletConnectProps {
  onConnect: (account: IAccount) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [error, setError] = useState<string>("");

  const handleConnect = async () => {
    setError("");
    const connectedAccount = await connectWallet();
    if (connectedAccount) {
      setAccount(connectedAccount);
      onConnect(connectedAccount);
    } else {
      setError("Failed to connect wallet. Ensure Bearby is installed.");
    }
  };

  return (
    <div className="p-4">
      {account ? (
        <p className="text-green-500">Connected: {account.address.slice(0, 8)}...</p>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}