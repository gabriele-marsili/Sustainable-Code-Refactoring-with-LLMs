"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const cleanedText = text.replace(/[ -]/g, '').toLowerCase();
        const seenLetters = new Set();
        for (let i = 0; i < cleanedText.length; i++) {
            const char = cleanedText[i];
            if (seenLetters.has(char)) {
                return false;
            }
            seenLetters.add(char);
        }
        return true;
    }
}
exports.default = Isogram;
