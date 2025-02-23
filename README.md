# Lumix Token Frontend

Dashboard for interacting with the Lumix ERC20 token, built with **Next.js, Wagmi, TypeScript, and Tailwind CSS**. This dApp integrates with **MetaMask, Coinbase Wallet, and other injected wallets** via Wagmi.

## Features

- 🚀 Built with **Next.js** for performance
- 📡 **Wagmi hooks** for efficient blockchain interactions
- ⚙️ Type-safe implementation using **TypeScript**
- 🔄 **Reusable components** for improved maintainability

## Usage

### Connecting Wallets

Users can connect their wallets, which supports:

- **MetaMask**
- **Coinbase Wallet**
- **Injected Wallets**

### Token Interactions

The frontend enables users to perform:

#### Read Operations

- 💰 **Check balance** to view an account's token holdings
- 🔍 **Check allowance** to see the approved spending amount

#### Transactions

- 🔄 **Transfer tokens** to another address
- ✅ **Approve token spending** using allowance mechanism
- 🔄 **Transfer tokens using allowance**
- 🎁 **Claim Lumix tokens from the faucet** – one-time per address

#### Owner Actions

- 🏗️ **Mint new tokens** to increase supply within the cap
- 🔥 **Burn tokens** to reduce supply
- 🔄 **Transfer contract ownership** to another address
- ⏸️ **Pause or resume transactions** for emergency control

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest LTS recommended)
- **Yarn** or **npm**

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/ayushnagarcodes/lumix-token-frontend.git
cd lumix-token-frontend
npm install  # or yarn install
```

### Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables:

```env
ALCHEMY_API_KEY=your_alchemy_key
```

### Running the App

Start the development server:

```sh
npm run dev  # or yarn dev
```
