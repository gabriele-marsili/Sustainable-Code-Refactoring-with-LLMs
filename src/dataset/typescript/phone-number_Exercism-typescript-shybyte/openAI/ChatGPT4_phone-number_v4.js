"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        const cleaned = rawPhoneNumber.replace(/[^0-9]/g, '');
        this._number = cleaned.length === 10 ? cleaned : (cleaned.length === 11 && cleaned[0] === '1' ? cleaned.slice(1) : undefined);
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
