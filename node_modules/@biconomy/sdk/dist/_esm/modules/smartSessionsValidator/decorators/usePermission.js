import { sendUserOperation } from "viem/account-abstraction";
import { getAction, parseAccount } from "viem/utils";
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound.js";
/**
 * Executes actions using a smart session.
 *
 * This function allows for the execution of one or more actions within an enabled smart session.
 * It can handle batch transactions if the session is configured for multiple actions.
 *
 * @template TModularSmartAccount - Type of the modular smart account, extending ModularSmartAccount or undefined.
 * @param client - The client used to interact with the blockchain.
 * @param parameters - Parameters for using the session, including actions to execute and optional gas settings.
 * @returns A promise that resolves to the hash of the sent user operation.
 *
 * @throws {AccountNotFoundError} If no account is provided and the client doesn't have an associated account.
 *
 * @example
 * ```typescript
 * const result = await usePermission(nexusClient, {
 *   actions: [
 *     {
 *       target: '0x1234...',
 *       value: 0n,
 *       callData: '0xabcdef...'
 *     }
 *   ],
 *   maxFeePerGas: 1000000000n
 * });
 * console.log(`Transaction hash: ${result}`);
 * ```
 *
 * @remarks
 * - Ensure that the session is enabled and has the necessary permissions for the actions being executed.
 * - For batch transactions, all actions must be permitted within the same session.
 * - The function uses the `sendUserOperation` method, which is specific to account abstraction implementations.
 */
export async function usePermission(client, parameters) {
    const { account: account_ = client.account, maxFeePerGas, maxPriorityFeePerGas, nonce, actions } = parameters;
    if (!account_) {
        throw new AccountNotFoundError({
            docsPath: "/nexus/nexus-client/methods#sendtransaction"
        });
    }
    const account = parseAccount(account_);
    return await getAction(client, sendUserOperation, "sendUserOperation")({
        calls: actions.map((action) => ({
            to: action.target,
            value: BigInt(action.value.toString()),
            data: action.callData
        })),
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        account
    });
}
//# sourceMappingURL=usePermission.js.map