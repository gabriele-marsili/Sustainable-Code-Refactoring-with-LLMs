"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        const numbersOnly = rawPhoneNumber.replace(/\D/g, '');
        if (numbersOnly.length === 10) {
            this._number = numbersOnly;
        }
        else if (numbersOnly.length === 11 && numbersOnly[0] === '1') {
            this._number = numbersOnly.slice(1);
        }
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
