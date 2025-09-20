"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        const length = rawPhoneNumber.length;
        if (length < 10 || length > 14) {
            return;
        }
        let numbersOnly = '';
        for (let i = 0; i < length; i++) {
            const char = rawPhoneNumber[i];
            if (char >= '0' && char <= '9') {
                numbersOnly += char;
            }
            else if (char !== '(' && char !== ')' && char !== '-' && char !== '.' && char !== ' ') {
                return;
            }
        }
        const numLength = numbersOnly.length;
        if (numLength === 10) {
            this._number = numbersOnly;
        }
        else if (numLength === 11 && numbersOnly[0] === '1') {
            this._number = numbersOnly.slice(1);
        }
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
