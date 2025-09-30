"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const sanitized = digitString.replace(/\s/g, '');
    const length = sanitized.length;
    if (length <= 1 || /[^0-9]/.test(sanitized))
        return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = length - 1; i >= 0; i--) {
        let digit = Number(sanitized[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}
