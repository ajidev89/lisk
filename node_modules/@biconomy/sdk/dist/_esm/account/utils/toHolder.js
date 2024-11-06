import { createWalletClient, custom } from "viem";
import { toAccount } from "viem/accounts";
import { signTypedData } from "viem/actions";
import { getAction } from "viem/utils";
export async function toHolder({ holder, address }) {
    if ("type" in holder && holder.type === "local") {
        return holder;
    }
    let walletClient = undefined;
    if ("request" in holder) {
        if (!address) {
            try {
                ;
                [address] = await holder.request({
                    method: "eth_requestAccounts"
                });
            }
            catch {
                ;
                [address] = await holder.request({
                    method: "eth_accounts"
                });
            }
        }
        if (!address)
            throw new Error("address required");
        walletClient = createWalletClient({
            account: address,
            transport: custom(holder)
        });
    }
    if (!walletClient) {
        walletClient = holder;
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
//# sourceMappingURL=toHolder.js.map