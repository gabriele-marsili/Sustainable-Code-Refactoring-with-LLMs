"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
        this.alphabetLength = this.alphabet.length;
        this.key = key === undefined ? this.genKey() : this.validateKey(key);
    }
    genKey() {
        const keyLength = 100;
        let key = '';
        for (let i = 0; i < keyLength; i++) {
            key += this.alphabet.charAt(Math.floor(Math.random() * this.alphabetLength));
        }
        return key;
    }
    validateKey(key) {
        if (!/^[a-z]+$/.test(key)) {
            throw 'Bad key';
        }
        return key;
    }
    charToInt(char) {
        return this.alphabet.indexOf(char);
    }
    intToChar(int) {
        const index = (int % this.alphabetLength + this.alphabetLength) % this.alphabetLength;
        return this.alphabet.charAt(index);
    }
    convert(str, isEncode) {
        const keyLength = this.key.length;
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const charInt = this.charToInt(char);
            const keyIdx = i % keyLength;
            const keyCharInt = this.charToInt(this.key[keyIdx]);
            const convertedInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
            result += this.intToChar(convertedInt);
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
