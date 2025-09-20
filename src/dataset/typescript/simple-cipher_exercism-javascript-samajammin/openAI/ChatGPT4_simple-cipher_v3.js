"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this.key = key ? this.validateKey(key) : this.genKey();
    }
    genKey() {
        const randomChars = new Uint8Array(100);
        crypto.getRandomValues(randomChars);
        return Array.from(randomChars, (byte) => SimpleCipher.alphabet[byte % SimpleCipher.alphabetLength]).join('');
    }
    validateKey(key) {
        if (!/^[a-z]+$/.test(key)) {
            throw new Error('Bad key');
        }
        return key;
    }
    static charToInt(char) {
        return char.charCodeAt(0) - 97;
    }
    static intToChar(int) {
        return String.fromCharCode((int + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength + 97);
    }
    convert(str, isEncode) {
        const keyLength = this.key.length;
        return Array.from(str, (char, idx) => {
            const charInt = SimpleCipher.charToInt(char);
            const keyCharInt = SimpleCipher.charToInt(this.key[idx % keyLength]);
            const resultInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
            return SimpleCipher.intToChar(resultInt);
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
