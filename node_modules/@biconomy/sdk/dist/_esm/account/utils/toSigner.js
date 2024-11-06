import { createWalletClient, custom, getAddress, hexToBytes } from "viem";
import { toAccount } from "viem/accounts";
import { signTypedData } from "viem/actions";
import { getAction } from "viem/utils";
export async function toSigner({ signer, address }) {
    // ethers Wallet does not have type property
    if ("provider" in signer) {
        return toAccount({
            address: getAddress((await signer.getAddress())),
            async signMessage({ message }) {
                if (typeof message === "string") {
                    return (await signer.signMessage(message));
                }
                // For ethers, raw messages need to be converted to Uint8Array
                if (typeof message.raw === "string") {
                    return (await signer.signMessage(hexToBytes(message.raw)));
                }
                return (await signer.signMessage(message.raw));
            },
            async signTransaction(_) {
                throw new Error("Not supported");
            },
            async signTypedData(typedData) {
                return signer.signTypedData(typedData.domain, typedData.types, typedData.message);
            }
        });
    }
    if ("type" in signer && signer.type === "local") {
        return signer;
    }
    let walletClient = undefined;
    if ("request" in signer) {
        if (!address) {
            try {
                ;
                [address] = await signer.request({
                    method: "eth_requestAccounts"
                });
            }
            catch {
                ;
                [address] = await signer.request({
                    method: "eth_accounts"
                });
            }
        }
        if (!address)
            throw new Error("address required");
        walletClient = createWalletClient({
            account: address,
            transport: custom(signer)
        });
    }
    if (!walletClient) {
        walletClient = signer;
    }
    return toAccount({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return walletClient.signMessage({ message });
        },
        async signTypedData(typedData) {
            return getAction(walletClient, signTypedData, "signTypedData")(typedData);
        },
        async signTransaction(_) {
            throw new Error("Not supported");
        }
    });
}
//# sourceMappingURL=toSigner.js.map