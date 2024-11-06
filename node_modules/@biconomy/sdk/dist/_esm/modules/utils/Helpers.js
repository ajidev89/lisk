import { isHex, pad, toHex } from "viem";
import { ERROR_MESSAGES } from "../../account/index.js";
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
export function parseReferenceValue(referenceValue) {
    let result;
    // Handle 20-byte Ethereum address
    if (isHex(referenceValue) && referenceValue.length === 42) {
        // Remove '0x' prefix, pad to 32 bytes (64 characters) on the left, then add '0x' prefix back
        result = `0x${"0".repeat(24)}${referenceValue.slice(2)}`;
    }
    else if (referenceValue?.raw) {
        result = referenceValue?.raw;
    }
    else if (typeof referenceValue === "bigint") {
        result = pad(toHex(referenceValue), { size: 32 });
    }
    else if (typeof referenceValue === "number") {
        result = pad(toHex(BigInt(referenceValue)), { size: 32 });
    }
    else if (typeof referenceValue === "boolean") {
        result = pad(toHex(referenceValue), { size: 32 });
    }
    else if (isHex(referenceValue)) {
        // review
        result = referenceValue;
    }
    else if (typeof referenceValue === "string") {
        result = pad(referenceValue, { size: 32 });
    }
    else {
        // (typeof referenceValue === "object")
        result = pad(toHex(referenceValue), { size: 32 });
    }
    if (!isHex(result) || result.length !== 66) {
        throw new Error(ERROR_MESSAGES.INVALID_HEX);
    }
    return result;
}
export function sanitizeSignature(signature) {
    let signature_ = signature;
    const potentiallyIncorrectV = Number.parseInt(signature_.slice(-2), 16);
    if (![27, 28].includes(potentiallyIncorrectV)) {
        const correctV = potentiallyIncorrectV + 27;
        signature_ = signature_.slice(0, -2) + correctV.toString(16);
    }
    if (signature.slice(0, 2) !== "0x") {
        signature_ = `0x${signature_}`;
    }
    return signature_;
}
//# sourceMappingURL=Helpers.js.map