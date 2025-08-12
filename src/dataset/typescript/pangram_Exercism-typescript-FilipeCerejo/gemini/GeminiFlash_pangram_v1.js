"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
function isPangram(phrase) {
    // The number of unique English letters (a-z).
    const ALPHABET_LENGTH = 26;
    // Use a boolean array to efficiently track which letters have been found.
    // Each index corresponds to a letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
    // Initialized to all false.
    const foundLetters = new Array(ALPHABET_LENGTH).fill(false);
    // Counter for the number of unique alphabet letters found so far.
    let uniqueFoundCount = 0;
    // Iterate over the phrase character by character.
    // Using charCodeAt and a traditional for loop is generally more performant
    // than methods like `split('').forEach` or `toLowerCase()` on each character,
    // as it avoids creating intermediate string objects and function call overhead.
    for (let i = 0; i < phrase.length; i++) {
        const charCode = phrase.charCodeAt(i);
        let index = -1; // Default: not an alphabet character
        // Check if the character is a lowercase English letter (a-z)
        if (charCode >= 97 && charCode <= 122) { // ASCII 'a' is 97, 'z' is 122
            index = charCode - 97; // Calculate index (0-25)
        }
        // Check if the character is an uppercase English letter (A-Z)
        else if (charCode >= 65 && charCode <= 90) { // ASCII 'A' is 65, 'Z' is 90
            index = charCode - 65; // Calculate index (0-25)
        }
        // If the character is an alphabet letter
        if (index !== -1) {
            // If this specific letter has not been found yet
            if (!foundLetters[index]) {
                foundLetters[index] = true; // Mark it as found
                uniqueFoundCount++; // Increment the count of unique letters found
                // Early exit: If all 26 unique letters have been found,
                // we can immediately return true as it's a pangram.
                // This significantly reduces execution time for long phrases that are pangrams.
                if (uniqueFoundCount === ALPHABET_LENGTH) {
                    return true;
                }
            }
        }
    }
    // After iterating through the entire phrase, return true if all 26 letters were found.
    return uniqueFoundCount === ALPHABET_LENGTH;
}
