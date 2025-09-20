"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const MIN_CHAR_CODE = 97; // char code of 'a'
const OFFSET = 26; // Total letters in the alphabet
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
        return Array.from({ length: RANDOM_KEY_LENGTH }, () => String.fromCharCode(MIN_CHAR_CODE + Math.floor(Math.random() * OFFSET))).join('');
    }
    transcodeChar(letter, keyChar, multiplier) {
        const charCode = letter.charCodeAt(0) - MIN_CHAR_CODE;
        const keyCode = keyChar.charCodeAt(0) - MIN_CHAR_CODE;
        return String.fromCharCode(((charCode + keyCode * multiplier + OFFSET) % OFFSET) + MIN_CHAR_CODE);
    }
    transcode(text, type) {
        const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
        const keyLength = this.cipherKey.length;
        return Array.from(text.toLowerCase().replace(/\W/g, ''), (letter, index) => this.transcodeChar(letter, this.cipherKey[index % keyLength], multiplier)).join('');
    }
    encode(text) {
        return this.transcode(text, CipherTypeEnum.encode);
    }
    decode(text) {
        return this.transcode(text, CipherTypeEnum.decode);
    }
}
exports.SimpleCipher = SimpleCipher;
