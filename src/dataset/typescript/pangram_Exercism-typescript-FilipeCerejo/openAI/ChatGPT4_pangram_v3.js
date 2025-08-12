"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabetLength = 26;
function isPangram(phrase) {
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++) {
        const code = phrase.charCodeAt(i) | 32;
        if (code >= 97 && code <= 122) {
            seen.add(code);
            if (seen.size === alphabetLength)
                return true;
        }
    }
    return false;
}
