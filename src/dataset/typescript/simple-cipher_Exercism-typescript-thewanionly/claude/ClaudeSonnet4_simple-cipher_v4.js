"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCipher = void 0;
const MIN_CHAR_CODE = 97;
const MAX_CHAR_CODE = 122;
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
        this.keyCharCodes = this.precomputeKeyCodes();
    }
    get key() {
        return this.cipherKey;
    }
    generateKey() {
        const chars = new Array(RANDOM_KEY_LENGTH);
        for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
            chars[i] = String.fromCharCode(MIN_CHAR_CODE + Math.floor(Math.random() * LETTERS_TOTAL));
        }
        return chars.join('');
    }
    precomputeKeyCodes() {
        const codes = new Array(this.cipherKey.length);
        for (let i = 0; i < this.cipherKey.length; i++) {
            codes[i] = this.cipherKey.charCodeAt(i) - MIN_CHAR_CODE;
        }
        return codes;
    }
    modulo(x, y) {
        return ((x % y) + y) % y;
    }
    transcode(text, type) {
        const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
        const keyLength = this.keyCharCodes.length;
        let result = '';
        let resultIndex = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);
            if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
                const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier;
                const newCharCode = this.modulo(charCode - MIN_CHAR_CODE + keyOffset, LETTERS_TOTAL) + MIN_CHAR_CODE;
                result += String.fromCharCode(newCharCode);
                resultIndex++;
            }
            else if ((charCode >= 65 && charCode <= 90)) {
                const lowerCharCode = charCode + 32;
                const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier;
                const newCharCode = this.modulo(lowerCharCode - MIN_CHAR_CODE + keyOffset, LETTERS_TOTAL) + MIN_CHAR_CODE;
                result += String.fromCharCode(newCharCode);
                resultIndex++;
            }
            else if (charCode >= 48 && charCode <= 57) {
                result += char;
                resultIndex++;
            }
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
