"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(phrase) {
        // Convert the phrase to lowercase once in the constructor.
        // This avoids repeated conversion in the `isPangram` method,
        // contributing to efficiency by pre-processing.
        this.phrase = phrase.toLowerCase();
    }
    isPangram() {
        // Use a Set to store unique alphabet characters found.
        // A Set provides O(1) average time complexity for add and check operations,
        // and naturally handles uniqueness, which is crucial for this problem.
        const charSet = new Set();
        // Iterate directly over the phrase string.
        // This avoids the overhead of creating an intermediate array using `match()`
        // which consumes more memory and CPU cycles than a simple loop.
        for (let i = 0; i < this.phrase.length; i++) {
            const charCode = this.phrase.charCodeAt(i);
            // Check if the character's ASCII/UTF-16 code falls within the range
            // of lowercase English alphabet characters ('a' to 'z').
            // 'a' is 97, 'z' is 122. This is a very efficient way to filter characters.
            if (charCode >= 97 && charCode <= 122) {
                // Add the character to the set.
                charSet.add(this.phrase[i]);
                // Early exit optimization:
                // If the set already contains all 26 unique English alphabet letters,
                // we can stop processing the rest of the phrase immediately.
                // This significantly reduces computational effort for long phrases
                // that are pangrams found early on, thereby saving CPU time and energy.
                if (charSet.size === 26) {
                    return true;
                }
            }
        }
        // After iterating through the entire phrase, check if the total count
        // of unique alphabet characters collected is exactly 26.
        return charSet.size === 26;
    }
}
exports.default = Pangram;
