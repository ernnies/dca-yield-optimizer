export interface Strategy {
  tokenIn: string;
  tokenOut: string;
  amount: number;
  interval: number;
  preset: "Aggressive" | "Conservative";
}

export interface VaultData {
  balance: number;
  accumulated: number;
  swapHistory: { tokenIn: string; tokenOut: string; amount: number; timestamp: number }[];
}