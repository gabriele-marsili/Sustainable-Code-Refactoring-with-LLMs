"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(input) {
        const normalized = input.toLowerCase();
        const seen = new Set();
        for (let i = 0; i < normalized.length; i++) {
            const char = normalized[i];
            if (char >= 'a' && char <= 'z') {
                if (seen.has(char)) {
                    return false;
                }
                seen.add(char);
            }
        }
        return true;
    }
}
exports.default = Isogram;
