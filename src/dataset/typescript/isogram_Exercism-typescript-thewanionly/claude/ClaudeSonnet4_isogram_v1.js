"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const seen = new Set();
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (/\w/.test(char)) {
            const lowerChar = char.toLowerCase();
            if (seen.has(lowerChar)) {
                return false;
            }
            seen.add(lowerChar);
        }
    }
    return true;
}
