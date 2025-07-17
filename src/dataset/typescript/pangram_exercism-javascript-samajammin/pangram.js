"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    isPangram() {
        const charSet = new Set();
        const charArr = this.phrase.match(/[a-z]/g) || [];
        charArr.forEach(char => {
            charSet.add(char);
        });
        return charSet.size === 26;
    }
}
exports.default = Pangram;
