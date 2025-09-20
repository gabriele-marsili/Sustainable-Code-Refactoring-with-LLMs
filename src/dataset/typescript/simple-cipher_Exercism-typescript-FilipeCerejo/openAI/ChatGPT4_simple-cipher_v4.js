"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;
const charCodeA = 'a'.charCodeAt(0);
const charCodeZ = 'z'.charCodeAt(0);
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
    shiftChar(charCode, shift, direction) {
        const shifted = charCode + direction * shift;
        return String.fromCharCode(shifted > charCodeZ ? shifted - alphabetLength : shifted < charCodeA ? shifted + alphabetLength : shifted);
    }
    encode(text) {
        this.extendKey(text.length);
        return Array.from(text, (char, idx) => this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - charCodeA, 1)).join('');
    }
    decode(text) {
        this.extendKey(text.length);
        return Array.from(text, (char, idx) => this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - charCodeA, -1)).join('');
    }
}
exports.SimpleCipher = SimpleCipher;
