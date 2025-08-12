"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabetSet = new Set('abcdefghijklmnopqrstuvwxyz');
function isPangram(phrase) {
    const seen = new Set();
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i].toLowerCase();
        if (alphabetSet.has(char)) {
            seen.add(char);
            if (seen.size === 26)
                return true;
        }
    }
    return false;
}
