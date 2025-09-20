"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(phrase) {
    const seen = new Set();
    for (const char of phrase.toLowerCase()) {
        if (/\w/.test(char)) {
            if (seen.has(char)) {
                return false;
            }
            seen.add(char);
        }
    }
    return true;
}
