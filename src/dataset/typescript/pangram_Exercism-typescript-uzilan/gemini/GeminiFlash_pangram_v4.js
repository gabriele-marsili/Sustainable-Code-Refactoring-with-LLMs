"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        const foundLetters = new Set();
        const wordLength = this.word.length;
        // Iterate directly over the string characters to avoid intermediate array allocations.
        for (let i = 0; i < wordLength; i++) {
            const charCode = this.word.charCodeAt(i);
            // Optimized check for English alphabet characters using char codes.
            // This avoids the overhead of regular expressions and is generally faster.
            // 'a' is 97, 'z' is 122
            // 'A' is 65, 'Z' is 90
            if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
                // Convert to lowercase and add to the set.
                // Using String.fromCharCode and toLowerCase ensures consistency and handles both cases.
                foundLetters.add(String.fromCharCode(charCode).toLowerCase());
            }
            // Early exit optimization: If all 26 letters are found,
            // we can stop processing the rest of the string immediately.
            // This significantly reduces execution time and resource usage for pangrams.
            if (foundLetters.size === 26) {
                return true;
            }
        }
        // After checking all characters, return true only if all 26 unique letters were found.
        return foundLetters.size === 26;
    }
}
exports.default = Pangram;
