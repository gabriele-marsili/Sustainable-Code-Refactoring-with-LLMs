"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const seen = new Set();
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char !== ' ' && char !== '-') {
                const lower = char.toLowerCase();
                if (seen.has(lower)) {
                    return false;
                }
                seen.add(lower);
            }
        }
        return true;
    }
}
exports.default = Isogram;
