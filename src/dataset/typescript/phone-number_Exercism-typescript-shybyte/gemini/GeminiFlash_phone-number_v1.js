"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        let numbersOnly = '';
        for (let i = 0; i < rawPhoneNumber.length; i++) {
            const char = rawPhoneNumber[i];
            if (char >= '0' && char <= '9') {
                numbersOnly += char;
            }
            else if (char !== '.' && char !== '(' && char !== ')' && char !== '-' && char !== ' ') {
                return;
            }
        }
        const length = numbersOnly.length;
        if (length === 10) {
            this._number = numbersOnly;
        }
        else if (length === 11 && numbersOnly[0] === '1') {
            this._number = numbersOnly.slice(1);
        }
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
