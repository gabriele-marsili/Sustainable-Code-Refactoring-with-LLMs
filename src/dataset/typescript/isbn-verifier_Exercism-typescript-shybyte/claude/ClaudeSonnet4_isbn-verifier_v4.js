"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ISBN {
    constructor(isbnString) {
        this.isbnString = isbnString;
    }
    isValid() {
        const cleanIsbn = this.isbnString.replace(/-/g, '');
        const length = cleanIsbn.length;
        if (length === 0)
            return false;
        let checkSum = 0;
        for (let i = 0; i < length; i++) {
            const char = cleanIsbn[i];
            let digit;
            if (char === 'X' && i === length - 1) {
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
