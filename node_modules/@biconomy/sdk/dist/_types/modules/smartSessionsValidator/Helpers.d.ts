import type { ActionData, PolicyData, Session } from "@rhinestone/module-sdk";
import { type AbiFunction, type Address, type Hex, type PublicClient } from "viem";
import type { ActionConfig, CreateSessionDataParams, FullCreateSessionDataParams, RawActionConfig, Rule, SessionData, SpendingLimitsParams } from "./Types";
export declare const MAX_RULES = 16;
/**
 * Generates a random salt as a hexadecimal string.
 *
 * @returns A 32-byte hexadecimal string prefixed with '0x'.
 */
export declare const generateSalt: () => Hex;
/**
 * Creates an ActionConfig object from rules and a value limit.
 *
 * @param rules - An array of Rule objects.
 * @param valueLimit - The maximum value allowed for the action.
 * @returns An ActionConfig object.
 */
export declare const createActionConfig: (rules: Rule[], valueLimit?: bigint) => ActionConfig;
/**
 * Applies default values to a CreateSessionDataParams object.
 *
 * @param sessionInfo - The CreateSessionDataParams object to apply defaults to.
 * @returns A FullCreateSessionDataParams object with default values applied.
 */
export declare const applyDefaults: (sessionInfo: CreateSessionDataParams) => FullCreateSessionDataParams;
/**
 * Creates an ActionData object.
 *
 * @param contractAddress - The address of the contract.
 * @param functionSelector - The function selector or AbiFunction.
 * @param policies - An array of PolicyData objects.
 * @returns An ActionData object.
 */
export declare const createActionData: (contractAddress: Address, functionSelector: string | AbiFunction, policies: PolicyData[]) => ActionData;
/**
 * Converts an ActionConfig to a RawActionConfig.
 *
 * @param config - The ActionConfig to convert.
 * @returns A RawActionConfig object.
 */
export declare const toActionConfig: (config: ActionConfig) => RawActionConfig;
/**
 * Gets the permission ID for a given session.
 *
 * @param client - The PublicClient to use for the contract call.
 * @param session - The Session object.
 * @returns A promise that resolves to the permission ID as a Hex string.
 */
export declare const getPermissionId: ({ client, session }: {
    client: PublicClient;
    session: Session;
}) => Promise<`0x${string}`>;
export declare const isPermissionEnabled: ({ client, accountAddress, permissionId }: {
    client: PublicClient;
    accountAddress: Address;
    permissionId: Hex;
}) => Promise<unknown>;
/**
 * Converts an ActionConfig to a UniversalActionPolicy.
 *
 * @param actionConfig - The ActionConfig to convert.
 * @returns A PolicyData object representing the UniversalActionPolicy.
 */
export declare const toUniversalActionPolicy: (actionConfig: ActionConfig) => PolicyData;
/**
 * Creates a TimeRangePolicy.
 *
 * @param validUntil - The timestamp until which the policy is valid.
 * @param validAfter - The timestamp after which the policy is valid.
 * @returns A PolicyData object representing the TimeRangePolicy.
 */
export declare const toTimeRangePolicy: (validUntil: number, validAfter: number) => PolicyData;
/**
 * A PolicyData object representing a sudo policy.
 */
export declare const sudoPolicy: PolicyData;
/**
 * Converts SpendingLimitsParams to a SpendingLimitsPolicy.
 *
 * @param params - An array of SpendingLimitsParams.
 * @returns A PolicyData object representing the SpendingLimitsPolicy.
 */
export declare const toSpendingLimitsPolicy: (params: SpendingLimitsParams) => PolicyData;
/**
 * An object containing policy conversion functions.
 */
export declare const policies: {
    readonly to: {
        readonly universalAction: (actionConfig: ActionConfig) => PolicyData;
        readonly spendingLimits: (params: SpendingLimitsParams) => PolicyData;
    };
    readonly sudo: PolicyData;
};
/**
 * Zips SessionData into a compact string representation.
 *
 * @param sessionData - The SessionData object to be zipped.
 * @returns A string representing the zipped SessionData.
 */
export declare function zipSessionData(sessionData: SessionData): string;
/**
 * Unzips a string representation back into a SessionData object.
 *
 * @param zippedData - The string representing the zipped SessionData.
 * @returns The unzipped SessionData object.
 */
export declare function unzipSessionData(zippedData: string): SessionData;
export default policies;
//# sourceMappingURL=Helpers.d.ts.map