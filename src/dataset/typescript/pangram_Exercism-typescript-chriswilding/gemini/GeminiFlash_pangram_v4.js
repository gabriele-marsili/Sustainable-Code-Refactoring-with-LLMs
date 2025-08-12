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
    const c = input.charCodeAt(0);
    return c >= 97 && c < 123;
};
class Pangram {
    constructor(input) {
        _Pangram_input.set(this, void 0);
        __classPrivateFieldSet(this, _Pangram_input, input, "f");
    }
    isPangram() {
        // A Set is an efficient data structure for tracking unique characters.
        const seen = new Set();
        // Define the target number of unique letters for a pangram.
        const PANGRAM_SIZE = 26; // 'a' through 'z'
        // Iterate through the input string character by character.
        // This avoids creating a new, potentially large, lowercase string
        // using `this.#input.toLowerCase()`, which saves memory and CPU cycles.
        for (let i = 0; i < __classPrivateFieldGet(this, _Pangram_input, "f").length; i++) {
            const charCode = __classPrivateFieldGet(this, _Pangram_input, "f").charCodeAt(i);
            let lowerCaseChar = null;
            // Check if the character is an ASCII uppercase letter (A-Z).
            // ASCII 'A' is 65, 'Z' is 90.
            if (charCode >= 65 && charCode <= 90) {
                // Convert uppercase to lowercase by adding 32 to its ASCII code.
                // (e.g., 'A' (65) + 32 = 'a' (97))
                lowerCaseChar = String.fromCharCode(charCode + 32);
            }
            // Check if the character is an ASCII lowercase letter (a-z).
            // ASCII 'a' is 97, 'z' is 122.
            else if (charCode >= 97 && charCode <= 122) {
                // The character is already lowercase.
                lowerCaseChar = String.fromCharCode(charCode);
            }
            // If the character is a recognized ASCII letter (either uppercase or lowercase),
            // add its lowercase form to the Set.
            if (lowerCaseChar !== null) {
                seen.add(lowerCaseChar);
                // Early exit optimization: If we have already found all 26 unique
                // letters, there's no need to continue processing the rest of the string.
                // This significantly improves performance for pangrams found early
                // in long strings and reduces unnecessary computations.
                if (seen.size === PANGRAM_SIZE) {
                    return true;
                }
            }
        }
        // After iterating through the entire string, return true if all 26 letters were seen.
        return seen.size === PANGRAM_SIZE;
    }
}
_Pangram_input = new WeakMap();
exports.default = Pangram;
