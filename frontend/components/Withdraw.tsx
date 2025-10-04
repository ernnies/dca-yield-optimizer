import { useState } from "react";
import { withdrawFromVault, IAccount } from "../utils/massa";

interface WithdrawProps {
  account: IAccount | null;
}

export default function Withdraw({ account }: WithdrawProps) {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleWithdraw = async () => {
    if (!account) {
      setError("Please connect wallet");
      return;
    }
    if (amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    try {
      await withdrawFromVault(account, amount);
      alert("Withdrawal successful!");
      setAmount(0);
    } catch (err) {
      setError("Failed to withdraw");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Withdraw from Vault</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          placeholder="Amount to withdraw"
          className="p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          onClick={handleWithdraw}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
          disabled={!account || amount <= 0}
        >
          Withdraw
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}