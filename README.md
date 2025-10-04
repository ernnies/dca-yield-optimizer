# On-Chain DCA Yield Optimizer

A decentralized application (dApp) on the **Massa blockchain** that automates Dollar-Cost Averaging (DCA) and yield optimization.  
Users deposit assets into a smart contract vault, which autonomously executes token swaps on a Massa-based DEX at fixed or volatility-adjusted intervals and compounds staking rewards — all **without external triggers**.  

The **DeWeb-hosted frontend**, built with **Next.js** and **Tailwind CSS**, offers one-click strategy presets ("Aggressive" or "Conservative") and real-time monitoring with progress bars.

**Repository URL:** [https://github.com/ernnies/dca-yield-optimizer](https://github.com/ernnies/dca-yield-optimizer)

---

## 🚀 What It Does
The On-Chain DCA Yield Optimizer automates crypto investing by executing DCA swaps on a Massa-based DEX at scheduled intervals (daily/weekly) using **Autonomous Smart Contracts (ASC)**.  
It stakes vaulted assets to generate yield, auto-compounding rewards back into the strategy.  

The **adaptive DCA** adjusts swap frequency based on on-chain volatility metrics, optimizing returns.  
The DeWeb frontend provides one-click strategy presets and real-time vault monitoring, all running 100% on-chain.

---

## 💡 Problem Solved
Manual DCA and yield farming are:
- **Time-consuming**  
- **Emotion-driven**  
- **Expensive** due to gas fees and external keepers  

This dApp solves these problems by:
- Automating swaps and compounding rewards **fully on-chain**  
- Using **adaptive DCA** to reduce risk and improve performance  
- Providing a **simple frontend** for non-technical users  

---

## ✨ Features
- **Autonomous DCA**: Schedules token swaps (e.g., MAS → USDC) without external triggers.  
- **Yield Compounding**: Stakes assets and reinvests rewards automatically.  
- **Adaptive Intervals**: Adjusts swap frequency based on volatility (DEX price feeds).  
- **User-Friendly Interface**: One-click presets ("Aggressive" or "Conservative").  
- **100% On-Chain**: DeWeb-hosted frontend + ASC backend.  

---

## 🛠 Technologies Used

### Frontend
- **Next.js 15.5.2 (TypeScript)**
- **Tailwind CSS**
- **@massalabs/massa-web3@3.2.0**

### Smart Contracts
- **AssemblyScript**
- **Massa AS-SDK**
- **assemblyscript-json**

### Testing & Deployment
- **Massa SC Toolkit**
- **Massa Testnet (Chain ID 776583)**
- **Massa Station**
- **DeWeb CLI**

### Infrastructure
- **Node.js 18+**
- **Rust** (for WASM compilation)
- **Massa Client**

---

## ⚙️ How to Set Up

### Prerequisites
- Node.js >= 18.x  
- Rust (`cargo install massa-station`)  
- Massa Wallet (Bearby or similar)  
- Testnet coins (from [Massa Discord Faucet](https://discord.gg/massa))  
- Massa Node (local or via `massa-station`)  

### Frontend Setup
```bash
git clone https://github.com/ernnies/dca-yield-optimizer
cd dca-yield-optimizer

# Install dependencies
npm install

# Update contract addresses in utils/massa.ts
npm run dev
````

Visit [http://localhost:3000](http://localhost:3000).

### Smart Contract Setup

Each contract (Vault, DCA Strategy, Yield Manager, Mock DEX, Mock Staking, Mock Oracle) lives in `/contracts`.

```bash
cd contracts/vault
npm install
npm run build
```

Build output: `build/release.wasm`.
Repeat for all contracts.

---

## 🚢 Deployment

### Deploy Smart Contracts

Create `.env` in each contract folder:

```env
NODE_URL=https://buildnet.massa.net/api/v2
CHAIN_ID=776583
PRIVATE_KEY=your_wallet_secret_key
```

Deploy in order:

```bash
# Mock Staking → Mock DEX → Mock Oracle → Vault → Yield Manager → DCA Strategy
npm run deploy
```

Update `utils/massa.ts` with deployed addresses.
Verify on [Massa Explorer](https://buildnet-explorer.massa.net).

### Deploy Frontend to DeWeb

```bash
npm run build
npm run export
deweb deploy
```

---

## 🧩 Challenges Faced

* **SSR with Massa Web3**: Fixed `Client is not a constructor` using dynamic imports.
* **AssemblyScript JSON**: Used `assemblyscript-json` for strategy serialization.
* **Oracles**: Mocked via DEX price feeds.
* **Deferred Calls**: Tuned delays for reliable swap scheduling.
* **Testing**: Local node & mocks for integration testing.

---

## 📘 What We Learned

* Massa ASC = **true on-chain automation**, no external keepers.
* AssemblyScript requires JSON/math workarounds.
* Next.js SSR needs careful handling with browser-only libs.
* Mocks + localnet testing = essential for DeFi development.
* Static UI improves user onboarding.

---

## 🔮 What's Next

* Integrate **real oracles** (e.g., Chainlink).
* Use **Dusa DEX** for production swaps.
* Improve **volatility models** with historical data.
* Add **transaction modals** and live event streaming.
* Deploy to **Massa mainnet**.
* Conduct **security audits**.
* Build **mobile apps** with Grok voice mode.
