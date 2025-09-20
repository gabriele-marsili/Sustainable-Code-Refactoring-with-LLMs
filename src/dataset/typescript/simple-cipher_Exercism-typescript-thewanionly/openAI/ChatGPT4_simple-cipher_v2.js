"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE + 1; // Include 'z'
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
    transcodeChar(charCode, keyCharCode, multiplier) {
        return String.fromCharCode(MIN_CHAR_CODE +
            (((charCode - MIN_CHAR_CODE + (keyCharCode - MIN_CHAR_CODE) * multiplier) % OFFSET) + OFFSET) %
                OFFSET);
    }
    transcode(text, type) {
        const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
        const keyLength = this.cipherKey.length;
        return Array.from(text.toLowerCase())
            .filter((char) => char >= 'a' && char <= 'z') // Filter valid letters
            .map((char, index) => this.transcodeChar(char.charCodeAt(0), this.cipherKey.charCodeAt(index % keyLength), multiplier))
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
