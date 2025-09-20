"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const seen = new Set();
    for (let i = 0; i < word.length; i++) {
        const char = word[i].toLowerCase();
        if (char >= 'a' && char <= 'z') {
            if (seen.has(char)) {
                return false;
            }
            seen.add(char);
        }
    }
    return true;
}
