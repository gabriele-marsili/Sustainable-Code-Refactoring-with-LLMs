"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const cleanedDigitString = digitString.replace(/\s/g, '');
    if (cleanedDigitString.length < 2) {
        return false;
    }
    let sum = 0;
    let alternate = false;
    for (let i = cleanedDigitString.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedDigitString[i], 10);
        if (isNaN(digit)) {
            return false;
        }
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}
