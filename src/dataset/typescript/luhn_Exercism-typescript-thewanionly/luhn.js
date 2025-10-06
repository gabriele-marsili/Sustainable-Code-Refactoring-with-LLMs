"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const cleanedString = digitString.replace(/\s/g, '');
    const len = cleanedString.length;
    if (len <= 1)
        return false;
    if (!/^\d+$/.test(cleanedString))
        return false;
    let sum = 0;
    for (let i = len - 1; i >= 0; i--) {
        let digit = parseInt(cleanedString[i], 10);
        if ((len - 1 - i) % 2 !== 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return sum % 10 === 0;
}
