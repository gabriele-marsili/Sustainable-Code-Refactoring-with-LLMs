"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        this._number = null;
        const cleaned = rawPhoneNumber.replace(/[^0-9]/g, '');
        if (cleaned.length === 10) {
            this._number = cleaned;
        }
        else if (cleaned.length === 11 && cleaned[0] === '1') {
            this._number = cleaned.slice(1);
        }
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
