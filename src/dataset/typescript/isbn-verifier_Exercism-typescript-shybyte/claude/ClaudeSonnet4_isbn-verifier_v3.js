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
        const cleanIsbn = this.isbnString.replace(/-/g, '');
        const length = cleanIsbn.length;
        if (length !== 10) {
            return false;
        }
        let checkSum = 0;
        for (let i = 0; i < length; i++) {
            const char = cleanIsbn[i];
            let digit;
            if (char === 'X' && i === 9) {
                digit = 10;
            }
            else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - 48;
            }
            else {
                return false;
            }
            checkSum += digit * (10 - i);
        }
        return checkSum % 11 === 0;
    }
}
exports.default = ISBN;
