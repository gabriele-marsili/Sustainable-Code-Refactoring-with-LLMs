"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const cleanedDigitString = digitString.replace(/\s/g, '');
    const n = cleanedDigitString.length;
    if (n <= 1) {
        return false;
    }
    let sum = 0;
    for (let i = n - 1; i >= 0; i--) {
        const digit = parseInt(cleanedDigitString[i], 10);
        if (isNaN(digit)) {
            return false;
        }
        let doubledDigit = digit;
        if ((n - 1 - i) % 2 !== 0) {
            doubledDigit *= 2;
            if (doubledDigit > 9) {
                doubledDigit -= 9;
            }
        }
        sum += doubledDigit;
    }
    return sum % 10 === 0;
}
