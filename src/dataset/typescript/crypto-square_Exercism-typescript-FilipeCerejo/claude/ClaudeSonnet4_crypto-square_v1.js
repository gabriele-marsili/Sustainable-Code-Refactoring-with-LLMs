"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        //normalize
        const letters = this.removeNonCharsLower(plainText);
        const len = letters.length;
        //matrix size
        const c = Math.ceil(Math.sqrt(len));
        const r = Math.ceil(len / c);
        //encode
        const encoded = [];
        for (let col = 0; col < c; col++) {
            let chunk = '';
            for (let row = 0; row < r; row++) {
                const idx = row * c + col;
                if (idx < len) {
                    chunk += letters[idx];
                }
                else {
                    break;
                }
            }
            if (chunk) {
                encoded.push(chunk);
            }
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
