"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.key = key === undefined ? this.genKey() : this.validateKey(key);
        this.keyLength = this.key.length;
        this.keyCharCodes = new Uint8Array(this.keyLength);
        for (let i = 0; i < this.keyLength; i++) {
            this.keyCharCodes[i] = this.key.charCodeAt(i) - 97;
        }
    }
    genKey() {
        const chars = new Array(100);
        for (let i = 0; i < 100; i++) {
            chars[i] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        return chars.join('');
    }
    validateKey(key) {
        for (let i = 0; i < key.length; i++) {
            const code = key.charCodeAt(i);
            if (code < 97 || code > 122) {
                throw 'Bad key';
            }
        }
        return key;
    }
    convert(str, isEncode) {
        const result = new Array(str.length);
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i) - 97;
            const keyCharCode = this.keyCharCodes[i % this.keyLength];
            let newCharCode = isEncode ? charCode + keyCharCode : charCode - keyCharCode;
            newCharCode = ((newCharCode % 26) + 26) % 26;
            result[i] = String.fromCharCode(newCharCode + 97);
        }
        return result.join('');
    }
    encode(message) {
        return this.convert(message, true);
    }
    decode(cipher) {
        return this.convert(cipher, false);
    }
}
exports.default = SimpleCipher;
