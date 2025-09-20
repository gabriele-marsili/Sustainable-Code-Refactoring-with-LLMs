"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(phrase) {
    const letters = new Set();
    for (const char of phrase.toLowerCase()) {
        if (/[a-z]/.test(char)) {
            if (letters.has(char)) {
                return false;
            }
            letters.add(char);
        }
    }
    return true;
}
