"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.key = key ? this.validateKey(key) : this.genKey();
    }
    genKey() {
        const keyArray = new Uint8Array(100);
        crypto.getRandomValues(keyArray);
        return Array.from(keyArray, byte => SimpleCipher.alphabet[byte % SimpleCipher.alphabetLength]).join('');
    }
    validateKey(key) {
        if (!/^[a-z]+$/.test(key)) {
            throw new Error('Bad key');
        }
        return key;
    }
    charToInt(char) {
        return char.charCodeAt(0) - 97; // 'a'.charCodeAt(0) === 97
    }
    intToChar(int) {
        return String.fromCharCode((int + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength + 97);
    }
    convert(str, isEncode) {
        const keyLength = this.key.length;
        return Array.from(str, (char, idx) => {
            const charInt = this.charToInt(char);
            const keyCharInt = this.charToInt(this.key[idx % keyLength]);
            const resultInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
            return this.intToChar(resultInt);
        }).join('');
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
