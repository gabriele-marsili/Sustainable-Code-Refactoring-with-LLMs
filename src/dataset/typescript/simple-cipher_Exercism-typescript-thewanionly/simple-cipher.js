"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const MIN_CHAR_CODE = 97; //char code of 'a'
const MAX_CHAR_CODE = 122; //char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE;
const LETTERS_TOTAL = 26;
const RANDOM_KEY_LENGTH = 100;
var CipherTypeEnum;
(function (CipherTypeEnum) {
    CipherTypeEnum["encode"] = "encode";
    CipherTypeEnum["decode"] = "decode";
})(CipherTypeEnum || (CipherTypeEnum = {}));
class SimpleCipher {
    constructor(key = '') {
        this.cipherKey = key || this.generateKey();
    }
    get key() {
        return this.cipherKey;
    }
    generateKey() {
        let key = '';
        for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
            // Generate random number from 0 to 25
            const randomNumber = Math.floor(Math.random() * LETTERS_TOTAL);
            // Get the character equivalent of the random number and append to key
            key += String.fromCharCode(MIN_CHAR_CODE + randomNumber);
        }
        return key;
    }
    modulo(x, y) {
        return ((x % y) + y) % y;
    }
    transcode(text, type) {
        const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
        return text
            .replace(/\W/g, '') //remove non-word characters and white spaces, but keeyp the numbers
            .toLowerCase() //turn all chars to lower case
            .split('')
            .map((letter, index) => String.fromCharCode(this.modulo(letter.charCodeAt(0) -
            MIN_CHAR_CODE +
            (this.cipherKey[index % this.cipherKey.length].charCodeAt(0) - MIN_CHAR_CODE) *
                multiplier, OFFSET + 1) + MIN_CHAR_CODE))
            .join('');
    }
    encode(text) {
        return this.transcode(text, CipherTypeEnum.encode);
    }
    decode(text) {
        return this.transcode(text, CipherTypeEnum.decode);
    }
}
exports.SimpleCipher = SimpleCipher;
