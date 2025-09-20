"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const cleanedWord = word.toLowerCase().replace(/\W/g, '');
    const charSet = new Set();
    for (let i = 0; i < cleanedWord.length; i++) {
        const char = cleanedWord[i];
        if (charSet.has(char)) {
            return false;
        }
        charSet.add(char);
    }
    return true;
}
