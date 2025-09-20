"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const noSpaceDigit = digitString.replace(/\s/g, '');
    const len = noSpaceDigit.length;
    if (len < 2) {
        return false;
    }
    let sum = 0;
    for (let i = len - 1; i >= 0; i--) {
        let digit = parseInt(noSpaceDigit[i], 10);
        if (isNaN(digit)) {
            return false; // Or handle invalid characters as needed
        }
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
