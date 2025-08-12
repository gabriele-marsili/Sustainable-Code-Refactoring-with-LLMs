"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pangram_input;
Object.defineProperty(exports, "__esModule", { value: true });
const isLowerCaseASCIILetter = (input) => {
    // This function's signature and core logic are preserved as per requirements.
    const c = input.charCodeAt(0);
    return c >= 97 && c < 123;
};
class Pangram {
    constructor(input) {
        _Pangram_input.set(this, void 0);
        __classPrivateFieldSet(this, _Pangram_input, input, "f");
    }
    isPangram() {
        // Use a bitmask (an integer) to efficiently track the presence of each of the 26 lowercase ASCII letters.
        // This is significantly more memory-efficient and faster than using a Set for a fixed, small alphabet,
        // as it avoids object overhead and hash table operations.
        let seenLettersMask = 0; // Each bit from 0 to 25 will represent a letter 'a' through 'z'.
        const ALL_LETTERS_MASK = (1 << 26) - 1; // Represents all 26 bits set (e.g., binary 11...1 for 26 ones).
        // Iterate over the input string character by character.
        // This avoids creating a new, potentially large, string for the entire lowercase version of the input
        // via `this.#input.toLowerCase()`, which can be a significant memory and CPU overhead.
        for (let i = 0; i < __classPrivateFieldGet(this, _Pangram_input, "f").length; i++) {
            let charCode = __classPrivateFieldGet(this, _Pangram_input, "f").charCodeAt(i);
            // Convert uppercase ASCII letters to their lowercase equivalents.
            // 'A' (ASCII 65) to 'Z' (ASCII 90) become 'a' (97) to 'z' (122) by adding 32.
            if (charCode >= 65 && charCode <= 90) {
                charCode += 32;
            }
            // Check if the character (potentially lowercased) is a lowercase ASCII letter.
            // This logic effectively replaces the original `isLowerCaseASCIILetter(c)` calls
            // after the implicit `toLowerCase()` on the entire string.
            if (charCode >= 97 && charCode <= 122) {
                // Calculate the 0-based index for the letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
                const letterIndex = charCode - 97;
                // Set the corresponding bit in the `seenLettersMask`.
                // Bitwise OR is very fast.
                seenLettersMask |= (1 << letterIndex);
                // Early exit: If all 26 unique letters have been found (i.e., all 26 bits are set),
                // we can stop processing the rest of the string immediately. This significantly
                // reduces execution time for long strings that are pangrams early on.
                if (seenLettersMask === ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }
        // After iterating through the entire string, return true if all 26 bits are set,
        // meaning all lowercase ASCII letters were found. Otherwise, return false.
        return seenLettersMask === ALL_LETTERS_MASK;
    }
}
_Pangram_input = new WeakMap();
exports.default = Pangram;
