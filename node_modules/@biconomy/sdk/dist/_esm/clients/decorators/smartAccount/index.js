import { sendTransaction } from "./sendTransaction.js";
import { signMessage } from "./signMessage.js";
import { signTypedData } from "./signTypedData.js";
import { waitForTransactionReceipt } from "./waitForTransactionReceipt.js";
import { writeContract } from "./writeContract.js";
export function smartAccountActions() {
    return (client) => ({
        sendTransaction: (args) => sendTransaction(client, args),
        signMessage: (args) => signMessage(client, args),
        signTypedData: (args) => signTypedData(client, args),
        writeContract: (args) => writeContract(client, args),
        waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args)
    });
}
//# sourceMappingURL=index.js.map