"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;
const aCharCode = 'a'.charCodeAt(0);
const zCharCode = 'z'.charCodeAt(0);
class SimpleCipher {
    get key() {
        return this._key;
    }
    constructor(key) {
        this._key = key !== null && key !== void 0 ? key : this.buildKey();
    }
    buildKey() {
        let key = '';
        for (let i = 0; i < 100; i++) {
            const idx = Math.floor(Math.random() * alphabetLength);
            key += alphabet[idx];
        }
        return key;
    }
    extendKey(textLength) {
        if (textLength > this._key.length) {
            const timesRepeat = Math.ceil(textLength / this._key.length);
            this._key = this._key.repeat(timesRepeat);
        }
        return this._key;
    }
    encode(text) {
        const extendedKey = this.extendKey(text.length);
        let encodedText = '';
        for (let i = 0; i < text.length; i++) {
            const textCharCode = text.charCodeAt(i);
            const keyCharCode = extendedKey.charCodeAt(i);
            const keyIdxDisplacement = keyCharCode - aCharCode;
            let encodedLetter = textCharCode + keyIdxDisplacement;
            if (encodedLetter > zCharCode) {
                encodedLetter -= alphabetLength;
            }
            encodedText += String.fromCharCode(encodedLetter);
        }
        return encodedText;
    }
    decode(text) {
        const extendedKey = this.extendKey(text.length);
        let decodedText = '';
        for (let i = 0; i < text.length; i++) {
            const textCharCode = text.charCodeAt(i);
            const keyCharCode = extendedKey.charCodeAt(i);
            const keyIdxDisplaced = keyCharCode - aCharCode;
            let decodedLetter = textCharCode - keyIdxDisplaced;
            if (decodedLetter < aCharCode) {
                decodedLetter += alphabetLength;
            }
            decodedText += String.fromCharCode(decodedLetter);
        }
        return decodedText;
    }
}
exports.SimpleCipher = SimpleCipher;
