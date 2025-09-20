"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const seen = new Set();
        for (const char of text.toLowerCase()) {
            if (char !== ' ' && char !== '-' && seen.has(char)) {
                return false;
            }
            seen.add(char);
        }
        return true;
    }
}
exports.default = Isogram;
