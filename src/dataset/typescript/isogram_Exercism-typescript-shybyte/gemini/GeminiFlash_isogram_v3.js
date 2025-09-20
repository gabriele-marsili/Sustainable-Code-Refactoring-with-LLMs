"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const cleanedText = text.replace(/[ -]/g, '').toLowerCase();
        if (cleanedText.length === 0) {
            return true;
        }
        const seen = new Set();
        for (let i = 0; i < cleanedText.length; i++) {
            const char = cleanedText[i];
            if (seen.has(char)) {
                return false;
            }
            seen.add(char);
        }
        return true;
    }
}
exports.default = Isogram;
