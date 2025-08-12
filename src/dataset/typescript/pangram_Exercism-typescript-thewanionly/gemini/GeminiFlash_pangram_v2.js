"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26;
function isPangram(sentence) {
    let seenLettersMask = 0; // A bitmask to efficiently track which letters have been seen
    let uniqueLetterCount = 0; // A counter for unique letters found
    // Iterate over each character in the sentence
    // This avoids creating intermediate arrays and strings (like .split(), .filter(), .toLowerCase() on the whole string)
    // and reduces memory allocations and garbage collection overhead.
    for (let i = 0; i < sentence.length; i++) {
        let charCode = sentence.charCodeAt(i);
        // Convert uppercase letters to lowercase.
        // This is more efficient than calling .toLowerCase() on the entire string,
        // as it only processes characters as needed and avoids new string allocation.
        if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
            charCode += 32; // Convert 'A'-'Z' to 'a'-'z' by adding 32 to char code
        }
        // Check if the character is a lowercase letter within our target range ('a' to 'z')
        if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
            const letterIndex = charCode - MIN_CHAR_CODE; // Calculate 0 for 'a', 1 for 'b', ..., 25 for 'z'
            const bitPosition = 1 << letterIndex; // Create a bitmask for this specific letter
            // Check if this letter has NOT been seen before.
            // Bitwise AND operation (seenLettersMask & bitPosition) will be 0 if the bit is not set.
            if ((seenLettersMask & bitPosition) === 0) {
                seenLettersMask |= bitPosition; // Set the bit to mark this letter as seen
                uniqueLetterCount++; // Increment the count of unique letters found
                // Early exit: If all 26 unique alphabet letters have been found,
                // we can immediately return true without processing the rest of the sentence.
                // This significantly reduces execution time for long pangrams.
                if (uniqueLetterCount === TOTAL_ALPHABET_LETTERS) {
                    return true;
                }
            }
        }
    }
    // After iterating through the entire sentence, check if all 26 unique letters were found.
    return uniqueLetterCount === TOTAL_ALPHABET_LETTERS;
}
