"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
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
            key += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        return key;
    }
    encode(text) {
        const keyLength = this._key.length;
        const textLength = text.length;
        let encoded = '';
        for (let i = 0; i < textLength; i++) {
            const keyChar = this._key[i % keyLength];
            const keyIdxDisplacement = keyChar.charCodeAt(0) - 97;
            let encodedCharCode = text.charCodeAt(i) + keyIdxDisplacement;
            if (encodedCharCode > 122) {
                encodedCharCode -= 26;
            }
            encoded += String.fromCharCode(encodedCharCode);
        }
        return encoded;
    }
    decode(text) {
        const keyLength = this._key.length;
        const textLength = text.length;
        let decoded = '';
        for (let i = 0; i < textLength; i++) {
            const keyChar = this._key[i % keyLength];
            const keyIdxDisplacement = keyChar.charCodeAt(0) - 97;
            let decodedCharCode = text.charCodeAt(i) - keyIdxDisplacement;
            if (decodedCharCode < 97) {
                decodedCharCode += 26;
            }
            decoded += String.fromCharCode(decodedCharCode);
        }
        return decoded;
    }
}
exports.SimpleCipher = SimpleCipher;
