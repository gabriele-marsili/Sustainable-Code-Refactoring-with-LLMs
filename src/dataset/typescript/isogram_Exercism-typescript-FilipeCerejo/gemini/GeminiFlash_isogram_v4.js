"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(phrase) {
    const cleanedPhrase = phrase.toLowerCase().replace(/[^a-z]/g, '');
    const letterSet = new Set();
    for (let i = 0; i < cleanedPhrase.length; i++) {
        const char = cleanedPhrase[i];
        if (letterSet.has(char)) {
            return false;
        }
        letterSet.add(char);
    }
    return true;
}
