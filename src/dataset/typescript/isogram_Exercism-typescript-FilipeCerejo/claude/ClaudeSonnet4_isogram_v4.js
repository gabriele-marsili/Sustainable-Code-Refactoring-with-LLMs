"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(phrase) {
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
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
