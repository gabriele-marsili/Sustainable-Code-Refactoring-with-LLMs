"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const cleanWord = word.toLowerCase().replace(/\W/g, '');
    const charSet = new Set();
    for (let i = 0; i < cleanWord.length; i++) {
        const char = cleanWord[i];
        if (charSet.has(char)) {
            return false;
        }
        charSet.add(char);
    }
    return true;
}
