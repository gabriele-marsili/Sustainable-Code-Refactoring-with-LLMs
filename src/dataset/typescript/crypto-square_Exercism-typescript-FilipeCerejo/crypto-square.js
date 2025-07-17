"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
class Crypto {
    constructor(plainText) {
        //normalize
        let letters = this.removeNonCharsLower(plainText);
        //matrix size
        let c = Math.ceil(Math.sqrt(letters.length));
        let r = Math.ceil(Math.sqrt(letters.length));
        //chunkcs
        let arr = [];
        let idx = 0;
        while (idx < letters.length) {
            arr.push(letters.substring(idx, idx + c));
            idx += c;
        }
        // //encode
        let encoded = [];
        for (let col = 0; col < c; col++) {
            let chunck = '';
            for (let row = 0; row < r; row++) {
                if (arr[row][col]) {
                    chunck += arr[row][col];
                }
                else {
                    chunck += ' ';
                    break;
                }
            }
            encoded.push(chunck);
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
