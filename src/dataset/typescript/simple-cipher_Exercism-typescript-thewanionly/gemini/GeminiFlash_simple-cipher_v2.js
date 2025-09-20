"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
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
        const randomValues = new Uint8Array(RANDOM_KEY_LENGTH);
        crypto.getRandomValues(randomValues);
        for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
            key += String.fromCharCode(MIN_CHAR_CODE + (randomValues[i] % LETTERS_TOTAL));
        }
        return key;
    }
    modulo(x, y) {
        return ((x % y) + y) % y;
    }
    transcode(text, type) {
        const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
        const cleanedText = text.replace(/\W/g, '').toLowerCase();
        const textLength = cleanedText.length;
        const keyLength = this.cipherKey.length;
        let result = '';
        for (let i = 0; i < textLength; i++) {
            const letter = cleanedText[i];
            const letterCode = letter.charCodeAt(0);
            const keyCharCode = this.cipherKey[i % keyLength].charCodeAt(0);
            result += String.fromCharCode(this.modulo(letterCode - MIN_CHAR_CODE + (keyCharCode - MIN_CHAR_CODE) * multiplier, OFFSET + 1) + MIN_CHAR_CODE);
        }
        return result;
    }
    encode(text) {
        return this.transcode(text, CipherTypeEnum.encode);
    }
    decode(text) {
        return this.transcode(text, CipherTypeEnum.decode);
    }
}
exports.SimpleCipher = SimpleCipher;
