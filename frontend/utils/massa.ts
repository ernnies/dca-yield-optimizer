import { Strategy, VaultData } from "../types";

// Dynamically import massa-web3 to avoid SSR issues
let ClientFactory: any, WalletClient: any, IAccount: any;

if (typeof window !== "undefined") {
  // Only import in the browser
  ({ ClientFactory, WalletClient, IAccount } = require("@massalabs/massa-web3"));
}

// Initialize client only in browser
export const getClient = async () => {
  if (typeof window === "undefined") return null;
  try {
    const providers = [
      {
        url: "https://testnet.massa.net/api/v2",
        type: "PUBLIC",
      },
    ];
    const client = await ClientFactory.createCustomClient(providers, 776583, true); // true for testnet
    return client;
  } catch (error) {
    console.error("Failed to create client:", error);
    return null;
  }
};

export const connectWallet = async (): Promise<IAccount | null> => {
  if (typeof window === "undefined") return null;
  try {
    const wallet = await WalletClient.getAccount();
    return wallet;
  } catch (error) {
    console.error("Wallet connection failed:", error);
    return null;
  }
};

export const depositToVault = async (account: IAccount, amount: number) => {
  const client = await getClient();
  if (!client) throw new Error("Client not initialized");
  const vaultAddress = "VAULT_CONTRACT_ADDRESS"; // Replace with deployed address
  return await client.smartContracts().callSmartContract({
    targetAddress: vaultAddress,
    functionName: "deposit",
    parameter: [account.address, amount],
    coins: amount,
  });
};

export const withdrawFromVault = async (account: IAccount, amount: number) => {
  const client = await getClient();
  if (!client) throw new Error("Client not initialized");
  const vaultAddress = "VAULT_CONTRACT_ADDRESS"; // Replace with deployed address
  return await client.smartContracts().callSmartContract({
    targetAddress: vaultAddress,
    functionName: "withdraw",
    parameter: [account.address, amount],
    coins: 0,
  });
};

export const startDcaStrategy = async (account: IAccount, strategy: Strategy) => {
  const client = await getClient();
  if (!client) throw new Error("Client not initialized");
  const dcaAddress = "DCA_CONTRACT_ADDRESS"; // Replace with deployed address
  return await client.smartContracts().callSmartContract({
    targetAddress: dcaAddress,
    functionName: "initStrategy",
    parameter: [account.address, strategy.tokenIn, strategy.tokenOut, strategy.amount, strategy.interval, strategy.preset],
    coins: strategy.amount,
  });
};

export const getVaultData = async (account: IAccount): Promise<VaultData> => {
  const client = await getClient();
  if (!client) throw new Error("Client not initialized");
  const vaultAddress = "VAULT_CONTRACT_ADDRESS";
  const balance = await client.smartContracts().readSmartContract({
    targetAddress: vaultAddress,
    functionName: "getBalance",
    parameter: [account.address],
  });
  // Mock swap history and accumulated data (replace with actual contract calls)
  return {
    balance: Number(balance.returnValue),
    accumulated: 0, // Fetch from contract
    swapHistory: [], // Fetch from contract events
  };
};