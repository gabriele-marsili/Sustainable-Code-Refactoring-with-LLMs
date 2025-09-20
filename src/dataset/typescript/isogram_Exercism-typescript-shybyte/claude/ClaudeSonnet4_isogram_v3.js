"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const seen = new Set();
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ' || char === '-')
                continue;
            const lowerChar = char.toLowerCase();
            if (seen.has(lowerChar))
                return false;
            seen.add(lowerChar);
        }
        return true;
    }
}
exports.default = Isogram;
