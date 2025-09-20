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
        const chars = new Array(100);
        for (let i = 0; i < 100; i++) {
            chars[i] = alphabet[Math.floor(Math.random() * 26)];
        }
        return chars.join('');
    }
    extendKey(textLength) {
        if (textLength > this._key.length) {
            const timesRepeat = Math.ceil(textLength / this._key.length);
            this._key = this._key.repeat(timesRepeat);
        }
    }
    encode(text) {
        this.extendKey(text.length);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const keyDisplacement = this._key.charCodeAt(i) - 97;
            let encodedChar = text.charCodeAt(i) + keyDisplacement;
            if (encodedChar > 122) {
                encodedChar -= 26;
            }
            result += String.fromCharCode(encodedChar);
        }
        return result;
    }
    decode(text) {
        this.extendKey(text.length);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const keyDisplacement = this._key.charCodeAt(i) - 97;
            let decodedChar = text.charCodeAt(i) - keyDisplacement;
            if (decodedChar < 97) {
                decodedChar += 26;
            }
            result += String.fromCharCode(decodedChar);
        }
        return result;
    }
}
exports.SimpleCipher = SimpleCipher;
