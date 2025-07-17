"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
class SimpleCipher {
    get key() {
        return this._key;
    }
    constructor(key) {
        this._key = key !== null && key !== void 0 ? key : this.buildKey();
    }
    buildKey() {
        let aux = 0;
        let key = '';
        while (aux < 100) {
            let idx = Math.floor(Math.random() * alphabet.length);
            key += alphabet[idx];
            aux++;
        }
        return key;
    }
    extendKey(text) {
        if (text.length > this._key.length) {
            let timesRepeat = Math.ceil(text.length / this._key.length);
            this._key = this._key.repeat(timesRepeat);
        }
    }
    encode(text) {
        this.extendKey(text); // if needed
        return [...text].map((t, idx) => {
            let keyIdxDisplacment = this._key.charCodeAt(idx) - 97; //'a' in ASCII
            let encodedLetter = t.charCodeAt(0) + keyIdxDisplacment;
            if (encodedLetter > 122) //'z' in ASCII
                encodedLetter -= alphabet.length;
            return String.fromCharCode(encodedLetter);
        }).join('');
    }
    decode(text) {
        this.extendKey(text); // if needed
        return [...text].map((t, idx) => {
            let keyIdxDisplaced = this._key.charCodeAt(idx) - 97; //'a' in ASCII
            let decodedLetter = t.charCodeAt(0) - keyIdxDisplaced;
            if (decodedLetter < 97) //'a' in ASCII
                decodedLetter += alphabet.length;
            return String.fromCharCode(decodedLetter);
        }).join('');
    }
}
exports.SimpleCipher = SimpleCipher;
