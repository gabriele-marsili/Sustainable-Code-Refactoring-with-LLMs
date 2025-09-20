"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneNumber {
    constructor(rawPhoneNumber) {
        const sanitized = rawPhoneNumber.replace(/[^0-9]/g, '');
        this._number = sanitized.length === 10
            ? sanitized
            : (sanitized.length === 11 && sanitized[0] === '1' ? sanitized.slice(1) : undefined);
    }
    number() {
        return this._number;
    }
}
exports.default = PhoneNumber;
