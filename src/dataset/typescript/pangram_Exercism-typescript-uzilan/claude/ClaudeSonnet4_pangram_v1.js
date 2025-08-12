"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.word = word;
    }
    isPangram() {
        let letterMask = 0;
        for (let i = 0; i < this.word.length; i++) {
            const char = this.word.charCodeAt(i);
            let letterIndex = -1;
            if (char >= 65 && char <= 90) { // A-Z
                letterIndex = char - 65;
            }
            else if (char >= 97 && char <= 122) { // a-z
                letterIndex = char - 97;
            }
            if (letterIndex >= 0) {
                letterMask |= (1 << letterIndex);
                if (letterMask === 0x3FFFFFF) { // All 26 bits set
                    return true;
                }
            }
        }
        return letterMask === 0x3FFFFFF;
    }
}
exports.default = Pangram;
