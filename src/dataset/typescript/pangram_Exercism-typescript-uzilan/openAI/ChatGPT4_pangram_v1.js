"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        const seen = new Set();
        for (let i = 0; i < this.word.length; i++) {
            const code = this.word.charCodeAt(i) | 32;
            if (code >= 97 && code <= 122) {
                seen.add(code);
                if (seen.size === 26)
                    return true;
            }
        }
        return false;
    }
}
exports.default = Pangram;
