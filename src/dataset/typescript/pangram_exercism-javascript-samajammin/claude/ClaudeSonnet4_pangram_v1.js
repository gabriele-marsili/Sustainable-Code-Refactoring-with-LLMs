"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    isPangram() {
        let letterMask = 0;
        for (let i = 0; i < this.phrase.length; i++) {
            const charCode = this.phrase.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) { // a-z
                letterMask |= 1 << (charCode - 97);
                if (letterMask === 0x3ffffff)
                    return true; // All 26 bits set
            }
        }
        return false;
    }
}
exports.default = Pangram;
