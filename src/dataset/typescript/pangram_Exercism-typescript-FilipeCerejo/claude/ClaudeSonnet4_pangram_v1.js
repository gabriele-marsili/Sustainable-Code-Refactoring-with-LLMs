"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
function isPangram(phrase) {
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        if (char >= 'a' && char <= 'z') {
            seen.add(char);
            if (seen.size === 26)
                return true;
        }
        else if (char >= 'A' && char <= 'Z') {
            seen.add(char.toLowerCase());
            if (seen.size === 26)
                return true;
        }
    }
    return seen.size === 26;
}
