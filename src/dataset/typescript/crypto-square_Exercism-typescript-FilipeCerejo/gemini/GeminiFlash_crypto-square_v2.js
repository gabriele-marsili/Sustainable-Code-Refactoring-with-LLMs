"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        const letters = this.removeNonCharsLower(plainText);
        const len = letters.length;
        const c = Math.ceil(Math.sqrt(len));
        let encoded = "";
        for (let col = 0; col < c; col++) {
            for (let row = 0; row < c; row++) {
                const index = row * c + col;
                if (index < len) {
                    encoded += letters[index];
                }
                else {
                    encoded += ' ';
                }
            }
            encoded += ' ';
        }
        this._encrypted = encoded.trim();
    }
    get ciphertext() {
        return this._encrypted;
    }
    removeNonCharsLower(text) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/[a-zA-Z0-9]/.test(char)) {
                result += char.toLowerCase();
            }
        }
        return result;
    }
}
exports.Crypto = Crypto;
