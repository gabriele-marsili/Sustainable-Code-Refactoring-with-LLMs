"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}
class ISBN {
    constructor(isbnString) {
        this.isbnString = isbnString;
    }
    isValid() {
        const cleaned = this.isbnString.replace(/-/g, '');
        if (cleaned.length !== 10 || !/^\d{9}[\dX]$/.test(cleaned))
            return false;
        let checkSum = 0;
        for (let i = 0; i < 10; i++) {
            const char = cleaned[i];
            const value = char === 'X' ? 10 : parseInt(char, 10);
            checkSum += value * (10 - i);
        }
        return checkSum % 11 === 0;
    }
}
exports.default = ISBN;
