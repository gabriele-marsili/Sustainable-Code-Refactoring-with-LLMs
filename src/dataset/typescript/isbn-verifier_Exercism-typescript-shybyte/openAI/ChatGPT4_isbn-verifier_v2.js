"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(array) {
    let total = 0;
    for (const value of array) {
        total += value;
    }
    return total;
}
class ISBN {
    constructor(isbnString) {
        this.isbnString = isbnString;
    }
    isValid() {
        const cleanedIsbn = this.isbnString.replace(/-/g, '');
        const length = cleanedIsbn.length;
        if (length !== 10)
            return false;
        let checkSum = 0;
        for (let i = 0; i < length; i++) {
            const char = cleanedIsbn[i];
            let digit = 0;
            if (char === 'X' && i === length - 1) {
                digit = 10;
            }
            else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - 48; // Faster than parseInt
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
