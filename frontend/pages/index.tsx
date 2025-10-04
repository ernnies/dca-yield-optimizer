import { useState } from "react";
import dynamic from "next/dynamic";
import { IAccount } from "@massalabs/massa-web3";
import Section from "../components/Section";

// Dynamically import components to disable SSR
const WalletConnect = dynamic(() => import("../components/WalletConnect"), { ssr: false });
const StrategySetup = dynamic(() => import("../components/StrategySetup"), { ssr: false });
const Withdraw = dynamic(() => import("../components/Withdraw"), { ssr: false });
const Dashboard = dynamic(() => import("../components/Dashboard"), { ssr: false });

export default function Home() {
  const [account, setAccount] = useState<IAccount | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          DCA Yield Optimizer
        </h1>

        {/* Features Section */}
        <Section title="Features">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Autonomous DCA</strong>: Execute dollar-cost averaging swaps on a Massa DEX
              at regular intervals without external triggers.
            </li>
            <li>
              <strong>Yield Compounding</strong>: Automatically reinvest staking rewards back into
              the vault for maximum returns.
            </li>
            <li>
              <strong>Adaptive Intervals</strong>: Adjust swap frequency based on on-chain
              volatility metrics for optimized performance.
            </li>
            <li>
              <strong>User-Friendly Interface</strong>: One-click strategy presets (Aggressive or
              Conservative) and real-time vault monitoring.
            </li>
            <li>
              <strong>100% On-Chain</strong>: Fully decentralized with Massa’s Autonomous Smart
              Contracts, hosted on DeWeb.
            </li>
          </ul>
        </Section>

        {/* How to Use Section */}
        <Section title="How to Use">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Connect Wallet</strong>: Use a Massa-compatible wallet (e.g., Bearby) to
              connect to the dApp.
            </li>
            <li>
              <strong>Deposit Funds</strong>: Deposit assets (e.g., MAS) into the vault to start
              your strategy.
            </li>
            <li>
              <strong>Choose a Strategy</strong>: Select a preset ("Aggressive" or
              "Conservative") and configure your DCA parameters (e.g., amount, token pair).
            </li>
            <li>
              <strong>Monitor Progress</strong>: Track your vault balance, swap history, and
              accumulated positions in the dashboard.
            </li>
            <li>
              <strong>Withdraw Anytime</strong>: Withdraw your assets from the vault whenever you
              need.
            </li>
          </ol>
        </Section>

        {/* Existing Components */}
        <WalletConnect onConnect={setAccount} />
        {account && (
          <div className="space-y-6">
            <StrategySetup account={account} />
            <Withdraw account={account} />
            <Dashboard account={account} />
          </div>
        )}
      </div>
    </div>
  );
}