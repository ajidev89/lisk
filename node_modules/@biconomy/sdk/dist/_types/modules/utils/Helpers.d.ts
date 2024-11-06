import { type ByteArray, type Hex } from "viem";
export type HardcodedReference = {
    raw: Hex;
};
type BaseReferenceValue = string | number | bigint | boolean | ByteArray;
export type AnyReferenceValue = BaseReferenceValue | HardcodedReference;
/**
 *
 * parseReferenceValue
 *
 * Parses the reference value to a hex string.
 * The reference value can be hardcoded using the {@link HardcodedReference} type.
 * Otherwise, it can be a string, number, bigint, boolean, or ByteArray.
 *
 * @param referenceValue {@link AnyReferenceValue}
 * @returns Hex
 */
export declare function parseReferenceValue(referenceValue: AnyReferenceValue): Hex;
export declare function sanitizeSignature(signature: Hex): Hex;
export {};
//# sourceMappingURL=Helpers.d.ts.map