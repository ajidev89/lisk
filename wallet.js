import { createNexusClient, createBicoPaymasterClient } from "@biconomy/sdk";
import { ethers } from "ethers";
import { liskSepolia } from "viem/chains";
import { http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import USDCAbi from "./usdc.json" assert { type: "json" };

class Lisk {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(
            "https://rpc.sepolia-api.lisk.com"
        );
        this.contractAddress = "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda";
        this.nexusClient = null;
    }

    async getContract() {
        if (!this.contract) {
            this.contract = new ethers.Contract(
                this.contractAddress,
                USDCAbi,
                this.provider
            );
        }
        return this.contract;
    }

    async createWallet() {
        const wallet = ethers.Wallet.createRandom();
        new ethers.Wallet(wallet.privateKey, this.provider);
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            blockchain: "LISK",
        };
    }

    async getBalance(address) {
        try {
            const contract = await this.getContract();
            const balanceBigInt = await contract.balanceOf(address);
            const name = await contract.name();
            const decimals = await contract.decimals();
            const balance = ethers.formatUnits(balanceBigInt, decimals);
            const chainBalanceBigInt = await this.provider.getBalance(address);
            const chainBalance = ethers.formatEther(chainBalanceBigInt); // Convert to Ether format

            return {
                name: name,
                contractBalance: balance,
                chainBalance: chainBalance,
            };
        } catch (error) {
            console.error("Error fetching token balance:", error);
            throw error;
        }
    }

    async initialize() {
        try {
            const privateKey =
                "0x8edf5086c88ab2f687e9b7ce9d5a0319eeb11fd0515e7eff06d1dfdf276f83cf"; // Replace with your method of securely getting the private key
            const account = privateKeyToAccount(`${privateKey}`);
            const bundlerUrl =
                "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
            const paymasterUrl =
                "https://paymaster-signing-service-573.staging.biconomy.io/api/v2/84532/B9WAdEWiO.33d618eb-de60-43ef-93b9-7e10d6fcd692";

            this.nexusClient = await createNexusClient({
                signer: account,
                chain: liskSepolia,
                transport: http(),
                bundlerTransport: http(bundlerUrl),
                paymaster: createBicoPaymasterClient({ paymasterUrl }),
            });

            console.log("Nexus client initialized successfully.");
        } catch (error) {
            console.error("Error initializing Nexus client:", error);
        }
    }

    async sendTransaction(
        address = "0xf5715961C550FC497832063a98eA34673ad7C816",
        amount = "0.001"
    ) {
        await this.initialize();
        const hash = await this.nexusClient.sendTransaction({
            calls: [
                {
                    to: address,
                    value: parseEther(amount),
                },
            ],
        });
        console.log("Transaction hash: ", hash);
        const receipt = await nexusClient.waitForTransactionReceipt({ hash });

        return receipt;
    }
}

export default Lisk;
