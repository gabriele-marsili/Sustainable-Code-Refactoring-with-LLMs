"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.key = key === undefined ? this.genKey() : this.validateKey(key);
        this.keyInts = this.precomputeKeyInts();
    }
    genKey() {
        let result = '';
        for (let i = 0; i < 100; i++) {
            result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        return result;
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
    precomputeKeyInts() {
        const result = new Array(this.key.length);
        for (let i = 0; i < this.key.length; i++) {
            result[i] = this.key.charCodeAt(i) - 97;
        }
        return result;
    }
    convert(str, isEncode) {
        let result = '';
        const keyLength = this.keyInts.length;
        for (let i = 0; i < str.length; i++) {
            const charInt = str.charCodeAt(i) - 97;
            const keyCharInt = this.keyInts[i % keyLength];
            let newCharInt;
            if (isEncode) {
                newCharInt = (charInt + keyCharInt) % 26;
            }
            else {
                newCharInt = (charInt - keyCharInt + 26) % 26;
            }
            result += String.fromCharCode(97 + newCharInt);
        }
        return result;
    }
    encode(message) {
        return this.convert(message, true);
    }
    decode(cipher) {
        return this.convert(cipher, false);
    }
}
exports.default = SimpleCipher;
