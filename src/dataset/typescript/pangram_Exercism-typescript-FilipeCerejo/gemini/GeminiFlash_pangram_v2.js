"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
// Pre-calculate a bitmask representing all 26 lowercase English letters ('a' through 'z').
// Each bit position corresponds to a letter: 'a' -> bit 0, 'b' -> bit 1, ..., 'z' -> bit 25.
// This constant ensures that all 26 bits are set to 1, representing the full alphabet.
const ALL_LETTERS_BITMASK = (1 << 26) - 1;
function isPangram(phrase) {
    // Initialize a bitmask to track the unique letters found in the input phrase.
    // Initially, no letters have been found, so the mask is 0.
    let foundLettersBitmask = 0;
    // Iterate over each character in the phrase using a traditional for loop.
    // This avoids the overhead of creating an intermediate array (like `phrase.split('')`)
    // and iterating with `forEach`, which can be slightly less efficient due to callback invocation.
    for (let i = 0; i < phrase.length; i++) {
        const charCode = phrase.charCodeAt(i); // Get the ASCII/Unicode value of the character.
        let bitPosition;
        // Determine the corresponding bit position for the character.
        // We only care about English alphabet letters (a-z and A-Z).
        // This avoids repeated `toLowerCase()` calls and string allocations.
        // If the character is a lowercase letter (ASCII 'a' through 'z').
        if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
            bitPosition = charCode - 97; // 'a' maps to 0, 'b' to 1, and so on.
        }
        // If the character is an uppercase letter (ASCII 'A' through 'Z').
        else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
            bitPosition = charCode - 65; // 'A' maps to 0, 'B' to 1, and so on (effectively lowercasing).
        }
        // If the character is not an English alphabet letter, skip it and continue to the next character.
        else {
            continue;
        }
        // Set the bit corresponding to the found letter in the `foundLettersBitmask`.
        // The bitwise OR (`|=`) ensures that if a bit is already set (meaning the letter was previously found),
        // it remains set, effectively tracking unique letters.
        foundLettersBitmask |= (1 << bitPosition);
        // Early exit optimization: If `foundLettersBitmask` now equals `ALL_LETTERS_BITMASK`,
        // it means all 26 unique English letters have been found. We can immediately return `true`
        // without processing the rest of the phrase, significantly improving performance for long pangrams.
        if (foundLettersBitmask === ALL_LETTERS_BITMASK) {
            return true;
        }
    }
    // After iterating through all characters in the phrase,
    // return true if and only if all 26 unique English letters were found.
    return foundLettersBitmask === ALL_LETTERS_BITMASK;
}
