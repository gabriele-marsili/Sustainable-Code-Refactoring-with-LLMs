"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = isValid;
function isValid(isbn) {
    if (isbn.length < 10)
        return false;
    let cleanLength = 0;
    let sum = 0;
    for (let i = 0; i < isbn.length && cleanLength < 10; i++) {
        const char = isbn[i];
        if (char >= '0' && char <= '9') {
            sum += (char.charCodeAt(0) - 48) * (10 - cleanLength);
            cleanLength++;
        }
        else if (char === 'X' && cleanLength === 9) {
            sum += 100;
            cleanLength++;
        }
        else if (char !== '-' && char !== ' ') {
            return false;
        }
    }
    return cleanLength === 10 && sum % 11 === 0;
}
