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
            const char = this.text[i];
            if (char >= 'a' && char <= 'z') {
                seen.add(char);
                if (seen.size === ALPHABET_SIZE)
                    return true;
            }
            else if (char >= 'A' && char <= 'Z') {
                seen.add(String.fromCharCode(char.charCodeAt(0) + 32));
                if (seen.size === ALPHABET_SIZE)
                    return true;
            }
        }
        return seen.size === ALPHABET_SIZE;
    }
}
exports.default = Pangram;
const numberOfDistinctElements = (array) => new Set(array).size;
