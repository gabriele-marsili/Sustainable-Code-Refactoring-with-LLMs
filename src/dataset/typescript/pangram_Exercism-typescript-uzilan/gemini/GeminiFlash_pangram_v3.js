"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        // A bitmask is more memory-efficient and faster than a Set for tracking 26 unique items.
        // Each bit represents one letter of the alphabet (a-z).
        let foundLettersBitmask = 0;
        // Iterate directly over the string to avoid creating intermediate arrays (split, filter).
        // This reduces memory allocation and garbage collection overhead.
        for (let i = 0; i < this.word.length; i++) {
            const charCode = this.word.charCodeAt(i);
            // Determine if the character is an alphabet letter and its 0-indexed position.
            // ASCII 'a' is 97, 'A' is 65.
            let letterIndex = -1;
            if (charCode >= 97 && charCode <= 122) { // Lowercase a-z
                letterIndex = charCode - 97;
            }
            else if (charCode >= 65 && charCode <= 90) { // Uppercase A-Z
                letterIndex = charCode - 65;
            }
            // If it's an alphabet letter, set the corresponding bit in the bitmask.
            if (letterIndex !== -1) {
                foundLettersBitmask |= (1 << letterIndex);
                // Early exit: If all 26 bits are set (0x3FFFFFF or (1 << 26) - 1),
                // it means all letters have been found. This saves CPU cycles and energy.
                if (foundLettersBitmask === 0x3FFFFFF) { // (1 << 26) - 1
                    return true;
                }
            }
        }
        // A pangram must contain all 26 letters. Check if all bits are set.
        return foundLettersBitmask === 0x3FFFFFF;
    }
}
exports.default = Pangram;
