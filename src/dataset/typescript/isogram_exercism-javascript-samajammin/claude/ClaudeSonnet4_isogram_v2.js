"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(input) {
        const seen = new Set();
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (char !== '-' && char !== ' ') {
                const lowerChar = char.toLowerCase();
                if (seen.has(lowerChar)) {
                    return false;
                }
                seen.add(lowerChar);
            }
        }
        return true;
    }
}
exports.default = Isogram;
