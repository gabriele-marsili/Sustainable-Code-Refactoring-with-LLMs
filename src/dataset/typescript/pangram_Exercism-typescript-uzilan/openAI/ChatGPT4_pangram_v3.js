"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        const seen = new Set();
        for (let i = 0, len = this.word.length; i < len; i++) {
            const code = this.word.charCodeAt(i);
            let lowerCode = 0;
            if (code >= 65 && code <= 90) {
                lowerCode = code + 32;
            }
            else if (code >= 97 && code <= 122) {
                lowerCode = code;
            }
            else {
                continue;
            }
            seen.add(lowerCode);
            if (seen.size === 26)
                return true;
        }
        return false;
    }
}
exports.default = Pangram;
