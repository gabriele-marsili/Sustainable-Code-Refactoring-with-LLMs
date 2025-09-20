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
        this._keyBytes = new Uint8Array(this._key.length);
        for (let i = 0; i < this._key.length; i++) {
            this._keyBytes[i] = this._key.charCodeAt(i) - 97;
        }
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
            this._keyBytes = new Uint8Array(this._key.length);
            for (let i = 0; i < this._key.length; i++) {
                this._keyBytes[i] = this._key.charCodeAt(i) - 97;
            }
        }
    }
    encode(text) {
        this.extendKey(text.length);
        const result = new Array(text.length);
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const encodedCode = charCode + this._keyBytes[i];
            result[i] = String.fromCharCode(encodedCode > 122 ? encodedCode - 26 : encodedCode);
        }
        return result.join('');
    }
    decode(text) {
        this.extendKey(text.length);
        const result = new Array(text.length);
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const decodedCode = charCode - this._keyBytes[i];
            result[i] = String.fromCharCode(decodedCode < 97 ? decodedCode + 26 : decodedCode);
        }
        return result.join('');
    }
}
exports.SimpleCipher = SimpleCipher;
