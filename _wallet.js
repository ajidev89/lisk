//import { createSafeClient } from "@safe-global/sdk-starter-kit";
import { SafeFactory } from "@safe-global/safe-core-sdk";
import { ethers } from "ethers";

class SafeWallet {
    // 0x05D032ac25d322df992303dCa074EE7392C117b9

    constructor() {
        this.SIGNER_ADDRESS = "0x6A2ed746a2539d381f27D189b2daFd74fEeaeDEC";
        this.SIGNER_PRIVATE_KEY =
            "0x87cba7b164c9c562d2b8fc656d5e1666da2b5a035b07f6f3681096873c48ac35";
        this.RPC_URL = "https://rpc.sepolia-api.lisk.com";
    }

    async createWallet() {
        const provider = new ethers.JsonRpcProvider(this.RPC_URL);

        // Create a new wallet
        const wallet = ethers.Wallet.createRandom();
        const signer = wallet.connect(provider);

        console.log(`Wallet Address: ${wallet.address}`);
        console.log(`Wallet Private Key: ${wallet.privateKey}`);
        console.log(`Wallet Public Key: ${wallet.privateKey}`);

        // Create a SafeFactory
        const safeFactory = await SafeFactory.create({
            ethAdapter: { ethers, signer },
        });

        const safeAccountConfig = {
            owners: [wallet.address], // Add the wallet address as the owner
            threshold: 1, // Number of signatures required
        };

        // Create the Safe
        const safeSdk = await safeFactory.deploySafe(safeAccountConfig);
        console.log(`Safe deployed at: ${safeSdk.getAddress()}`);

        return safeClient;
    }

    async createSignerWallet() {
        const wallet = ethers.Wallet.createRandom();
        return JSON.stringify({
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            address: wallet.address,
        });
    }
}

export default SafeWallet;
