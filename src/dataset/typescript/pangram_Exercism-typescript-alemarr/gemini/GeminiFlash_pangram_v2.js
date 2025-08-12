"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = void 0;
const TOTAL_CHARS = 26;
const isPangram = (sentence) => {
    // Use a boolean array to track found letters.
    // Index 0 corresponds to 'a', 1 to 'b', ..., 25 to 'z'.
    const foundLetters = new Array(TOTAL_CHARS).fill(false);
    let uniqueCount = 0; // Counts how many unique alphabetic characters have been found
    // Iterate over each character in the sentence
    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i].toLowerCase();
        // Check if the character is an English alphabet letter ('a' through 'z')
        if (char >= 'a' && char <= 'z') {
            const charCode = char.charCodeAt(0);
            // Calculate the index for the boolean array (e.g., 'a' -> 0, 'b' -> 1)
            const index = charCode - 'a'.charCodeAt(0);
            // If this letter hasn't been found yet
            if (!foundLetters[index]) {
                foundLetters[index] = true; // Mark it as found
                uniqueCount++; // Increment the count of unique letters
                // Optimization: If we have found all 26 unique letters,
                // we can short-circuit and immediately return true.
                if (uniqueCount === TOTAL_CHARS) {
                    return true;
                }
            }
        }
    }
    // After checking all characters, return true if all 26 unique letters were found
    return uniqueCount === TOTAL_CHARS;
};
exports.isPangram = isPangram;
