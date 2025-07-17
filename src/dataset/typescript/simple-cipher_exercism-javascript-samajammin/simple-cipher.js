"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
        this.key = key === undefined ? this.genKey() : this.validateKey(key);
    }
    genKey() {
        return Array.from(Array(100))
            .map(() => Math.floor(Math.random() * 26))
            .map(i => this.intToChar(i))
            .join('');
    }
    validateKey(key) {
        const isValid = /^[a-z]+$/.test(key);
        if (!isValid) {
            throw 'Bad key';
        }
        return key;
    }
    charToInt(char) {
        return this.alphabet.indexOf(char);
    }
    intToChar(int) {
        let index = int % 26;
        if (index < 0) {
            index += 26;
        }
        return this.alphabet.charAt(index);
    }
    convert(str, isEncode) {
        return str
            .split('')
            .map((char, idx) => {
            let charInt = this.charToInt(char);
            const keyIdx = idx < this.key.length ? idx : idx % this.key.length;
            const keyCharInt = this.charToInt(this.key[keyIdx]);
            if (isEncode) {
                charInt += keyCharInt;
            }
            else {
                charInt -= keyCharInt;
            }
            return this.intToChar(charInt);
        })
            .join('');
    }
    encode(message) {
        return this.convert(message, true);
    }
    decode(cipher) {
        return this.convert(cipher, false);
    }
}
exports.default = SimpleCipher;
