"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        let numbersOnly = '';
        let digitCount = 0;
        // Single pass: validate characters and extract digits
        for (let i = 0; i < rawPhoneNumber.length; i++) {
            const char = rawPhoneNumber[i];
            if (char >= '0' && char <= '9') {
                numbersOnly += char;
                digitCount++;
            }
            else if (char !== '.' && char !== '(' && char !== ')' && char !== '-' && char !== ' ') {
                return;
            }
        }
        if (digitCount === 10) {
            this._number = numbersOnly;
        }
        else if (digitCount === 11 && numbersOnly[0] === '1') {
            this._number = numbersOnly.slice(1);
        }
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
