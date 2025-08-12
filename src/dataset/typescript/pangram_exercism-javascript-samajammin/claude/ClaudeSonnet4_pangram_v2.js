"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    isPangram() {
        let seenLetters = 0;
        for (let i = 0; i < this.phrase.length; i++) {
            const charCode = this.phrase.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) {
                const bitPosition = charCode - 97;
                const mask = 1 << bitPosition;
                if ((seenLetters & mask) === 0) {
                    seenLetters |= mask;
                    if (seenLetters === 0x3ffffff)
                        return true;
                }
            }
        }
        return false;
    }
}
exports.default = Pangram;
