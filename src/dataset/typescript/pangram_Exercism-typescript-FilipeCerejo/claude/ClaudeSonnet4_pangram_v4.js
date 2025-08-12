"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
function isPangram(phrase) {
    let found = 0;
    const seen = new Array(26).fill(false);
    for (let i = 0; i < phrase.length && found < 26; i++) {
        const code = phrase.charCodeAt(i) | 32;
        if (code >= 97 && code <= 122) {
            const index = code - 97;
            if (!seen[index]) {
                seen[index] = true;
                found++;
            }
        }
    }
    return found === 26;
}
