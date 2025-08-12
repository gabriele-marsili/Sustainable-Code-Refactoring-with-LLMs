"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        // Use a boolean array to track which letters have been found.
        // Index 0 for 'a', 1 for 'b', ..., 25 for 'z'.
        const foundLetters = new Array(26).fill(false);
        let uniqueLetterCount = 0;
        // Iterate directly over the string characters to avoid creating intermediate arrays.
        for (let i = 0; i < this.word.length; i++) {
            const charCode = this.word.charCodeAt(i);
            let index;
            // Check if the character is a lowercase English letter (a-z)
            if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
                index = charCode - 97; // Map 'a' to 0, 'b' to 1, etc.
            }
            // Check if the character is an uppercase English letter (A-Z)
            else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
                index = charCode - 65; // Map 'A' to 0, 'B' to 1, etc.
            }
            // If it's not an English alphabet character, skip it.
            else {
                continue;
            }
            // If this letter hasn't been marked as found yet, mark it and increment count.
            if (!foundLetters[index]) {
                foundLetters[index] = true;
                uniqueLetterCount++;
                // Early exit: If all 26 letters have been found, we know it's a pangram.
                // This saves processing the rest of the string, significantly improving performance for long pangrams.
                if (uniqueLetterCount === 26) {
                    return true;
                }
            }
        }
        // After iterating through the entire word, return true if all 26 unique letters were found.
        return uniqueLetterCount === 26;
    }
}
exports.default = Pangram;
