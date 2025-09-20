"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.key = key === undefined ? this.genKey() : this.validateKey(key);
    }
    genKey() {
        let result = '';
        for (let i = 0; i < 100; i++) {
            result += SimpleCipher.alphabet.charAt(Math.floor(Math.random() * SimpleCipher.alphabetLength));
        }
        return result;
    }
    validateKey(key) {
        if (!/^[a-z]+$/.test(key)) {
            throw new Error('Bad key');
        }
        return key;
    }
    charToInt(char) {
        return SimpleCipher.alphabet.indexOf(char);
    }
    intToChar(int) {
        const index = (int % SimpleCipher.alphabetLength + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength;
        return SimpleCipher.alphabet.charAt(index);
    }
    convert(str, isEncode) {
        let result = '';
        const keyLength = this.key.length;
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const charInt = this.charToInt(char);
            const keyCharInt = this.charToInt(this.key[i % keyLength]);
            const newCharInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
            result += this.intToChar(newCharInt);
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
SimpleCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
SimpleCipher.alphabetLength = SimpleCipher.alphabet.length;
exports.default = SimpleCipher;
