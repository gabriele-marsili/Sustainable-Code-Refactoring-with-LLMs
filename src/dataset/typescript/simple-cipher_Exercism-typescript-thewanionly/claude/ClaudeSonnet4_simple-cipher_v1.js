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
        this.keyCharCodes = this.precomputeKeyCharCodes();
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
    precomputeKeyCharCodes() {
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
            // Skip non-lowercase letters
            if (charCode < MIN_CHAR_CODE || charCode > MAX_CHAR_CODE) {
                const lowerChar = char.toLowerCase();
                const lowerCharCode = lowerChar.charCodeAt(0);
                if (lowerCharCode >= MIN_CHAR_CODE && lowerCharCode <= MAX_CHAR_CODE) {
                    const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier;
                    const newCharCode = this.modulo(lowerCharCode - MIN_CHAR_CODE + keyOffset, OFFSET + 1) + MIN_CHAR_CODE;
                    result += String.fromCharCode(newCharCode);
                    resultIndex++;
                }
            }
            else {
                const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier;
                const newCharCode = this.modulo(charCode - MIN_CHAR_CODE + keyOffset, OFFSET + 1) + MIN_CHAR_CODE;
                result += String.fromCharCode(newCharCode);
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
