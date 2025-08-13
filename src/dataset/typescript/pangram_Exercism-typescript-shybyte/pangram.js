"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_SIZE = 26;
// Pre-calculate the target mask representing all 26 bits set.
// This allows for an efficient single comparison to check if all letters have been found.
const ALL_LETTERS_MASK = (1 << ALPHABET_SIZE) - 1;
class Pangram {
    constructor(text) {
        this.text = text;
    }
    isPangram() {
        let seenLettersMask = 0;
        const textLength = this.text.length;
        // Iterate through the string character by character.
        // This avoids creating intermediate strings and arrays,
        // reducing memory allocation and garbage collection overhead.
        for (let i = 0; i < textLength; i++) {
            const charCode = this.text.charCodeAt(i);
            // Check if the character is a lowercase letter (a-z)
            if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
                // Set the corresponding bit in the mask.
                // Example: 'a' maps to bit 0, 'b' to bit 1, etc.
                seenLettersMask |= (1 << (charCode - 97));
            }
            // Check if the character is an uppercase letter (A-Z)
            else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
                // Map uppercase letters to the same bit positions as their lowercase counterparts.
                seenLettersMask |= (1 << (charCode - 65));
            }
            // Early exit: If all 26 bits are set in the mask, it means all letters
            // have been found, so we can return true immediately.
            // This minimizes unnecessary iterations, saving CPU cycles and energy.
            if (seenLettersMask === ALL_LETTERS_MASK) {
                return true;
            }
        }
        // After checking all characters, return true if all 26 bits are set in the mask.
        return seenLettersMask === ALL_LETTERS_MASK;
    }
}
exports.default = Pangram;
