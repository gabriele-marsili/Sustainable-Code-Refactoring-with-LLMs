"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    const cleanString = digitString.replace(/\s/g, '');
    if (cleanString.length <= 1)
        return false;
    let sum = 0;
    let isEven = false;
    for (let i = cleanString.length - 1; i >= 0; i--) {
        const char = cleanString[i];
        if (char < '0' || char > '9')
            return false;
        let digit = parseInt(char, 10);
        if (isEven) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}
