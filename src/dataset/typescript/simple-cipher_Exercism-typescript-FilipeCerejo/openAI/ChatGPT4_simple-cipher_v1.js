"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;
const asciiOffset = 97; // 'a' in ASCII
class SimpleCipher {
    get key() {
        return this._key;
    }
    constructor(key) {
        this._key = key !== null && key !== void 0 ? key : this.buildKey();
    }
    buildKey() {
        return Array.from({ length: 100 }, () => alphabet[Math.floor(Math.random() * alphabetLength)]).join('');
    }
    extendKey(textLength) {
        if (textLength > this._key.length) {
            this._key = this._key.repeat(Math.ceil(textLength / this._key.length)).slice(0, textLength);
        }
    }
    encode(text) {
        this.extendKey(text.length);
        return text
            .split('')
            .map((char, idx) => {
            const encodedCharCode = ((char.charCodeAt(0) - asciiOffset + (this._key.charCodeAt(idx) - asciiOffset)) % alphabetLength) + asciiOffset;
            return String.fromCharCode(encodedCharCode);
        })
            .join('');
    }
    decode(text) {
        this.extendKey(text.length);
        return text
            .split('')
            .map((char, idx) => {
            const decodedCharCode = ((char.charCodeAt(0) - asciiOffset - (this._key.charCodeAt(idx) - asciiOffset) + alphabetLength) % alphabetLength) + asciiOffset;
            return String.fromCharCode(decodedCharCode);
        })
            .join('');
    }
}
exports.SimpleCipher = SimpleCipher;
