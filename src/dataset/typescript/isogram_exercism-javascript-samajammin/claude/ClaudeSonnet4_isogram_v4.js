"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(input) {
        const seen = new Set();
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (char !== '-' && char !== ' ') {
                const normalized = char >= 'A' && char <= 'Z' ?
                    String.fromCharCode(char.charCodeAt(0) + 32) : char;
                if (seen.has(normalized)) {
                    return false;
                }
                seen.add(normalized);
            }
        }
        return true;
    }
}
exports.default = Isogram;
