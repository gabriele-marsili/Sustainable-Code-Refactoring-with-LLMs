"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const seen = new Set();
    for (const char of word.toLowerCase()) {
        if (/\W/.test(char))
            continue;
        if (seen.has(char))
            return false;
        seen.add(char);
    }
    return true;
}
