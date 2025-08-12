"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
function isPangram(phrase) {
    const seen = new Set();
    for (const char of phrase) {
        const lower = char.toLowerCase();
        if (lower >= 'a' && lower <= 'z') {
            seen.add(lower);
            if (seen.size === 26)
                return true;
        }
    }
    return false;
}
