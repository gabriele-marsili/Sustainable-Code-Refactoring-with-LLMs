"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = isValid;
function isValid(isbn) {
    let cleanString = isbn.replace(/[^\d|X]/g, '');
    if (cleanString.length !== 10)
        return false;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const char = cleanString[i];
        if (i < 9) {
            if (char < '0' || char > '9')
                return false;
            sum += (char.charCodeAt(0) - 48) * (10 - i);
        }
        else {
            if (char !== 'X' && (char < '0' || char > '9'))
                return false;
            sum += (char === 'X' ? 10 : char.charCodeAt(0) - 48) * (10 - i);
        }
    }
    return sum % 11 === 0;
}
