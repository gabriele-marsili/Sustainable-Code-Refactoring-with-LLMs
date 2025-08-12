"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        // Use a Set to efficiently store unique letters encountered
        // Sets provide O(1) average time complexity for add and lookup operations,
        // which is ideal for checking uniqueness and counts.
        const uniqueLetters = new Set();
        const wordLength = this.word.length;
        // Iterate over the string characters directly.
        // This avoids creating intermediate arrays (like from split(), filter())
        // and reduces memory allocations and garbage collection overhead.
        for (let i = 0; i < wordLength; i++) {
            const char = this.word[i];
            const charCode = char.charCodeAt(0);
            // Check if the character is an English alphabet letter (A-Z or a-z)
            // by comparing its ASCII/Unicode character code.
            // This is significantly faster than using a regular expression for single character checks.
            // 'A' is 65, 'Z' is 90
            // 'a' is 97, 'z' is 122
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
                // Convert the character to lowercase before adding to the Set.
                // This ensures case-insensitivity (e.g., 'A' and 'a' are treated as the same letter).
                // toLowerCase() on a single character string is very efficient.
                uniqueLetters.add(char.toLowerCase());
                // Early exit optimization: If we have already found all 26 unique English letters,
                // there's no need to process the rest of the word.
                // This significantly reduces execution time for long strings that are pangrams.
                if (uniqueLetters.size === 26) {
                    return true;
                }
            }
        }
        // After iterating through all characters, return true if exactly 26 unique letters were found.
        return uniqueLetters.size === 26;
    }
}
exports.default = Pangram;
