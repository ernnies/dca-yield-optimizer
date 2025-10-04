import { useState, useEffect } from "react";
import { getVaultData, IAccount } from "../utils/massa";
import ProgressBar from "./ProgressBar";
import { VaultData } from "../types";

interface DashboardProps {
  account: IAccount | null;
}

export default function Dashboard({ account }: DashboardProps) {
  const [vaultData, setVaultData] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setLoading(true);
      getVaultData(account).then((data) => {
        setVaultData(data);
        setLoading(false);
      });
    }
  }, [account]);

  if (!account) return <p className="text-red-500">Please connect wallet</p>;
  if (loading) return <p>Loading...</p>;
  if (!vaultData) return <p>No vault data available</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vault Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Vault Balance</h3>
          <p>{vaultData.balance} MAS</p>
          <ProgressBar label="Accumulated USDC" value={vaultData.accumulated} max={1000} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Swap History</h3>
          {vaultData.swapHistory.length > 0 ? (
            <ul className="list-disc pl-5">
              {vaultData.swapHistory.map((swap, index) => (
                <li key={index}>
                  Swapped {swap.amount} {swap.tokenIn} to {swap.tokenOut} at{" "}
                  {new Date(swap.timestamp * 1000).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No swaps yet</p>
          )}
        </div>
      </div>
    </div>
  );
}