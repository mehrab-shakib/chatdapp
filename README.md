# 🗨️ Decentralized Chat Application

A decentralized real-time chat application built with **Next.js, Solidity, Hardhat, and ethers.js**. This dApp enables users to chat securely on the blockchain, integrate MetaMask for authentication, and perform real-time transactions.

## 🚀 Features
- 🔹 **Real-Time Chat** – Decentralized messaging between users.
- 🔹 **MetaMask Integration** – Login and authenticate via Ethereum wallet.
- 🔹 **Real-Time Transactions** – Store messages on the blockchain with timestamps.
- 🔹 **Friends List** – Add and manage friends.
- 🔹 **Decentralized** – Messages are stored on Ethereum, ensuring security and privacy.

---

## 📸 Screenshots

![Screenshot 2025-03-25 144233](https://github.com/user-attachments/assets/1069b41c-b4d8-47ed-961e-9305f5592e7b)
![Screenshot 2025-03-25 144306](https://github.com/user-attachments/assets/fd18aee0-4845-4e5d-8149-171cb3c53702)
![Screenshot 2025-03-25 144214](https://github.com/user-attachments/assets/11434f08-f24e-4af4-9869-85da5f652228)

![Screenshot 2025-03-25 144224](https://github.com/user-attachments/assets/f6ed2d49-f5c4-4aa2-94f5-e549b286eb41)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, CSS, ethers.js
- **Backend**: Solidity (Smart Contracts)
- **Blockchain Development**: Hardhat, Alchemy

---

## 📌 Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- MetaMask Extension
- Hardhat
- An Ethereum testnet (Goerli, Sepolia, or Local Hardhat node)

---

## 🏗️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/mehrab-shakib/chatdapp.git
cd chatdapp
```

Install dependencies:
```bash
npm install
```

---

## 📜 Deploying Smart Contract Locally

1️⃣ **Start a Local Blockchain**
```bash
npx hardhat node
```

2️⃣ **Deploy the Smart Contract**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3️⃣ **Copy the Contract Address** from the terminal output and update it in the frontend `constants.js` file.

---

## 🚀 Running the Frontend

Start the Next.js development server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌍 Deploying to Testnet (Goerli/Sepolia)

1️⃣ **Update `hardhat.config.js`** with your Alchemy/Infura API key and private key.

2️⃣ Deploy to a testnet:
```bash
npx hardhat run scripts/deploy.js --network goerli
```

3️⃣ Update the frontend with the deployed contract address.

---

## 🎬 Live Demo

🔗 **[Live Demo](chatdapp-xi.vercel.app)** 

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit your changes
4. Open a PR

---


## 📬 Contact

- **GitHub**: [My GitHub Profile](https://github.com/mehrab-shakib)
- **LinkedIn**: [Mehrab Hossain Shakib](www.linkedin.com/in/mehrab-hossain-shakib-4b4293242)
- **Email**: shakibmehrab@gmail.com
