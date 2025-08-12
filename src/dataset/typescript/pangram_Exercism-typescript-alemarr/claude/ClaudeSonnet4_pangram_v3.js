"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = void 0;
const TOTAL_CHARS = 26;
const isPangram = (sentence) => {
    const seen = new Set();
    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        if (char >= 'a' && char <= 'z') {
            seen.add(char);
            if (seen.size === TOTAL_CHARS)
                return true;
        }
        else if (char >= 'A' && char <= 'Z') {
            seen.add(char.toLowerCase());
            if (seen.size === TOTAL_CHARS)
                return true;
        }
    }
    return seen.size === TOTAL_CHARS;
};
exports.isPangram = isPangram;
