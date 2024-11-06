import { sanitizeSignature } from "./Helpers.js";
/**
 * Creates a Module object from the given implementation parameters.
 *
 * This function takes the module implementation details and constructs a standardized
 * Module object with methods for signing and generating stub signatures.
 *
 * @param implementation - The parameters defining the module implementation.
 * @returns A Module object with standardized methods and properties.
 *
 * @example
 * ```typescript
 * const myModule = toModule({
 *   accountAddress: '0x1234...',
 *   address: '0x5678...',
 *   signer: mySigner,
 *   initData: '0xabcd...',
 *   // ... other parameters
 * });
 * ```
 *
 * @remarks
 * - The returned Module object includes methods for getting stub signatures, signing user operation hashes, and signing messages.
 * - The `getStubSignature` method generates a dummy signature for testing or placeholder purposes.
 * - The `signUserOpHash` and `signMessage` methods use the provided signer to create actual signatures.
 */
export function toModule(implementation) {
    const { accountAddress, address, initData, deInitData, signer, moduleInitData, ...rest } = implementation;
    return {
        address,
        module: address,
        accountAddress,
        moduleInitData,
        signer,
        type: "validator",
        initData,
        deInitData,
        getStubSignature: async () => {
            const dynamicPart = address.substring(2).padEnd(40, "0");
            return `0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000${dynamicPart}000000000000000000000000000000000000000000000000000000000000004181d4b4981670cb18f99f0b4a66446df1bf5b204d24cfcb659bf38ba27a4359b5711649ec2423c5e1247245eba2964679b6a1dbb85c992ae40b9b00c6935b02ff1b00000000000000000000000000000000000000000000000000000000000000`;
        },
        signUserOpHash: async (userOpHash) => await signer.signMessage({
            message: { raw: userOpHash }
        }),
        signMessage: async (message) => sanitizeSignature(await signer.signMessage({ message })),
        ...rest
    };
}
//# sourceMappingURL=toModule.js.map