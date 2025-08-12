"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_SIZE = 26;
class Pangram {
    constructor(text) {
        this.text = text;
    }
    isPangram() {
        const seen = new Set();
        for (let i = 0; i < this.text.length; i++) {
            const code = this.text.charCodeAt(i) | 32;
            if (code >= 97 && code <= 122) {
                seen.add(String.fromCharCode(code));
                if (seen.size === ALPHABET_SIZE)
                    return true;
            }
        }
        return false;
    }
}
exports.default = Pangram;
