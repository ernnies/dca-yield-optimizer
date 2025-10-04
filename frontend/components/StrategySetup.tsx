import { useState } from "react";
import { startDcaStrategy, IAccount } from "../utils/massa";
import { Strategy } from "../types";

interface StrategySetupProps {
  account: IAccount | null;
}

export default function StrategySetup({ account }: StrategySetupProps) {
  const [strategy, setStrategy] = useState<Strategy>({
    tokenIn: "MAS",
    tokenOut: "USDC",
    amount: 10,
    interval: 86400, // 1 day in seconds
    preset: "Conservative",
  });
  const [error, setError] = useState<string>("");

  const handleStart = async () => {
    if (!account) {
      setError("Please connect wallet");
      return;
    }
    try {
      await startDcaStrategy(account, strategy);
      alert("Strategy started!");
    } catch (err) {
      setError("Failed to start strategy");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Setup DCA Strategy</h2>
      <div className="grid grid-cols-1 gap-4">
        <select
          className="p-2 border rounded"
          value={strategy.preset}
          onChange={(e) => setStrategy({ ...strategy, preset: e.target.value as "Aggressive" | "Conservative", interval: e.target.value === "Aggressive" ? 86400 : 172800 })}
        >
          <option value="Conservative">Conservative</option>
          <option value="Aggressive">Aggressive</option>
        </select>
        <input
          type="number"
          placeholder="Amount per swap"
          className="p-2 border rounded"
          value={strategy.amount}
          onChange={(e) => setStrategy({ ...strategy, amount: Number(e.target.value) })}
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Token In (e.g., MAS)"
            className="p-2 border rounded flex-1"
            value={strategy.tokenIn}
            onChange={(e) => setStrategy({ ...strategy, tokenIn: e.target.value })}
          />
          <input
            type="text"
            placeholder="Token Out (e.g., USDC)"
            className="p-2 border rounded flex-1"
            value={strategy.tokenOut}
            onChange={(e) => setStrategy({ ...strategy, tokenOut: e.target.value })}
          />
        </div>
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!account}
        >
          Start Strategy
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}