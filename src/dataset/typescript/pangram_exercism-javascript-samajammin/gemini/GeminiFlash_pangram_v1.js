"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(phrase) {
        // Storing the phrase in lowercase avoids repeated conversions in isPangram.
        this.phrase = phrase.toLowerCase();
    }
    isPangram() {
        const charSet = new Set();
        const aCode = 'a'.charCodeAt(0);
        const zCode = 'z'.charCodeAt(0);
        // Iterate directly over the string characters.
        // This avoids the overhead of creating an intermediate array from `match(/[a-z]/g)`.
        for (let i = 0; i < this.phrase.length; i++) {
            const charCode = this.phrase.charCodeAt(i);
            // Check if the character is a lowercase English letter.
            if (charCode >= aCode && charCode <= zCode) {
                charSet.add(this.phrase[i]);
                // Early exit: if we have found all 26 letters, we can stop immediately.
                // This is a significant optimization for long phrases that are pangrams.
                if (charSet.size === 26) {
                    return true;
                }
            }
        }
        // After checking all characters, return true only if all 26 unique letters were found.
        return charSet.size === 26;
    }
}
exports.default = Pangram;
