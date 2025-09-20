"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const noSpaceDigit = digitString.replace(/\s/g, '');
    if (noSpaceDigit.length < 2)
        return false;
    let sum = 0;
    for (let i = noSpaceDigit.length - 1, change = false; i >= 0; i--, change = !change) {
        const digit = noSpaceDigit.charCodeAt(i) - 48;
        sum += change ? (digit > 4 ? digit * 2 - 9 : digit * 2) : digit;
    }
    return sum % 10 === 0;
}
