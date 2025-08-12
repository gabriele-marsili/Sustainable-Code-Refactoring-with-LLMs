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
class Pangram {
    constructor(input) {
        _Pangram_input.set(this, void 0);
        __classPrivateFieldSet(this, _Pangram_input, input, "f");
    }
    isPangram() {
        // Use a fixed-size boolean array to track seen letters (a-z).
        // This is more memory-efficient and offers faster, direct indexing
        // compared to a Set for a small, known alphabet.
        const seenLetters = new Array(26).fill(false);
        let uniqueCount = 0; // Counts how many unique letters from 'a' to 'z' have been found.
        // Pre-calculate ASCII char codes for 'a', 'z', 'A', 'Z' for efficiency.
        const charCodeA = 97; // 'a'.charCodeAt(0)
        const charCodeZ = 122; // 'z'.charCodeAt(0)
        const charCodeUpperA = 65; // 'A'.charCodeAt(0)
        const charCodeUpperZ = 90; // 'Z'.charCodeAt(0)
        // Iterate over the input string character by character.
        // Using a traditional for loop and charCodeAt(i) avoids creating
        // a new string with toLowerCase() and provides efficient access.
        for (let i = 0; i < __classPrivateFieldGet(this, _Pangram_input, "f").length; i++) {
            const charCode = __classPrivateFieldGet(this, _Pangram_input, "f").charCodeAt(i);
            let letterIndex;
            // Check if the character is a lowercase ASCII letter (a-z).
            if (charCode >= charCodeA && charCode <= charCodeZ) {
                letterIndex = charCode - charCodeA;
            }
            // Check if the character is an uppercase ASCII letter (A-Z).
            else if (charCode >= charCodeUpperA && charCode <= charCodeUpperZ) {
                // Map uppercase to the corresponding lowercase index.
                letterIndex = charCode - charCodeUpperA;
            }
            // If not an ASCII letter, skip to the next character.
            else {
                continue;
            }
            // If this letter hasn't been marked as seen yet:
            if (!seenLetters[letterIndex]) {
                seenLetters[letterIndex] = true; // Mark it as seen.
                uniqueCount++; // Increment the count of unique letters found.
                // Early exit: If all 26 unique letters have been found,
                // no need to process the rest of the string.
                // This significantly reduces CPU cycles for long pangram inputs.
                if (uniqueCount === 26) {
                    return true;
                }
            }
        }
        // After iterating through the entire string, return true only if all 26 unique letters were found.
        return uniqueCount === 26;
    }
}
_Pangram_input = new WeakMap();
exports.default = Pangram;
