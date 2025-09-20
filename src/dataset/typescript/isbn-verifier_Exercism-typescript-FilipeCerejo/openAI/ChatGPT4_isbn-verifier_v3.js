"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = isValid;
function isValid(isbn) {
    const cleanString = isbn.replace(/[^\dX]/g, '');
    if (cleanString.length !== 10 || !/^\d{9}[0-9X]$/.test(cleanString))
        return false;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const value = cleanString[i] === 'X' ? 10 : Number(cleanString[i]);
        sum += value * (10 - i);
    }
    return sum % 11 === 0;
}
