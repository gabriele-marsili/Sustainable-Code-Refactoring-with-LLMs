"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const seen = new Set();
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char >= 'A' && char <= 'Z') {
            const lowerChar = String.fromCharCode(char.charCodeAt(0) + 32);
            if (seen.has(lowerChar))
                return false;
            seen.add(lowerChar);
        }
        else if (char >= 'a' && char <= 'z') {
            if (seen.has(char))
                return false;
            seen.add(char);
        }
    }
    return true;
}
