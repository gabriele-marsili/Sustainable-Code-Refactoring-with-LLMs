"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        const letters = plainText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const length = letters.length;
        if (length === 0) {
            this._encrypted = '';
            return;
        }
        const c = Math.ceil(Math.sqrt(length));
        const r = Math.ceil(length / c);
        const encoded = new Array(c);
        for (let col = 0; col < c; col++) {
            let chunk = '';
            for (let row = 0; row < r; row++) {
                const idx = row * c + col;
                if (idx < length) {
                    chunk += letters[idx];
                }
                else {
                    chunk += ' ';
                    break;
                }
            }
            encoded[col] = chunk;
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
