"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        const letters = this.removeNonCharsLower(plainText);
        const c = Math.ceil(Math.sqrt(letters.length));
        const encoded = Array(c).fill('');
        for (let i = 0; i < letters.length; i++) {
            encoded[i % c] += letters[i];
        }
        this._encrypted = encoded.join(' ');
    }
    get ciphertext() {
        return this._encrypted;
    }
    removeNonCharsLower(text) {
        return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    }
}
exports.Crypto = Crypto;
