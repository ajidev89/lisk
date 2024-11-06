import type { Hex } from "viem";
import type { Signer } from "../../account/utils/toSigner.js";
import type { ModuleMeta } from "../../modules/utils/Types";
import type { AnyData, Module, ModuleParameters } from "./Types.js";
/**
 * Parameters for creating a module.
 */
export type ToModuleParameters = {
    /** The signer associated with the module. */
    signer: Signer;
    /** The address of the account that the module is associated with. */
    accountAddress: Hex;
    /** Optional initialization data for the module. */
    initData?: Hex;
    /** Optional metadata for module initialization. */
    moduleInitData?: ModuleMeta;
    /** Optional data for de-initializing the module. */
    deInitData?: Hex;
    /** Optional arguments for module initialization. */
    moduleInitArgs?: AnyData;
    /** Optional arguments for initialization. */
    initArgs?: AnyData;
};
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
export declare function toModule(implementation: ModuleParameters): Module;
//# sourceMappingURL=toModule.d.ts.map