"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = void 0;
const TOTAL_CHARS = 26;
const isPangram = (sentence) => {
    const seen = new Set();
    for (let i = 0, len = sentence.length; i < len; i++) {
        const code = sentence.charCodeAt(i) | 32;
        if (code >= 97 && code <= 122) {
            seen.add(code);
            if (seen.size === TOTAL_CHARS)
                return true;
        }
    }
    return false;
};
exports.isPangram = isPangram;
