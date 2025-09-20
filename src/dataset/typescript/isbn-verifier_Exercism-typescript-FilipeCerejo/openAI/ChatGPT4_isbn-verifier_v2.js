"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = isValid;
function isValid(isbn) {
    let cleanString = '';
    let checksum = 0;
    for (let i = 0, j = 10; i < isbn.length && j > 0; i++) {
        const char = isbn[i];
        if (char >= '0' && char <= '9') {
            cleanString += char;
            checksum += Number(char) * j--;
        }
        else if (char === 'X' && j === 1) {
            cleanString += 'X';
            checksum += 10;
            j--;
        }
    }
    return cleanString.length === 10 && checksum % 11 === 0;
}
