"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        const letters = this.removeNonCharsLower(plainText);
        const matrixSize = Math.ceil(Math.sqrt(letters.length));
        const encoded = [];
        for (let col = 0; col < matrixSize; col++) {
            let chunk = '';
            for (let row = 0; row < matrixSize; row++) {
                const index = row * matrixSize + col;
                if (index < letters.length) {
                    chunk += letters[index];
                }
                else {
                    chunk += ' ';
                    break;
                }
            }
            encoded.push(chunk);
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
