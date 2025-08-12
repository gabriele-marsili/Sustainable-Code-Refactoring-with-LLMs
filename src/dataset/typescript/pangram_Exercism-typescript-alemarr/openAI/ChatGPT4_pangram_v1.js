"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = void 0;
const TOTAL_CHARS = 26;
const isPangram = (sentence) => {
    const seen = new Set();
    for (let i = 0; i < sentence.length; i++) {
        const code = sentence.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            seen.add(String.fromCharCode(code + 32));
        }
        else if (code >= 97 && code <= 122) {
            seen.add(sentence[i]);
        }
        if (seen.size === TOTAL_CHARS)
            return true;
    }
    return false;
};
exports.isPangram = isPangram;
