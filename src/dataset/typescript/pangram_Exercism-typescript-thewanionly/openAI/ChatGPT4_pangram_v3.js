"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const MIN_CHAR_CODE = 97;
const MAX_CHAR_CODE = 122;
const TOTAL_ALPHABET_LETTERS = 26;
function isPangram(sentence) {
    const seen = new Set();
    for (let i = 0; i < sentence.length; i++) {
        const code = sentence.charCodeAt(i) | 32;
        if (code >= MIN_CHAR_CODE && code <= MAX_CHAR_CODE) {
            seen.add(code);
            if (seen.size === TOTAL_ALPHABET_LETTERS)
                return true;
        }
    }
    return false;
}
