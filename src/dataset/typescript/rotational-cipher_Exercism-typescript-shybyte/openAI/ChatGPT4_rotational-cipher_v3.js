"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_LENGTH = 26;
const CHAR_CODE_A = 'a'.charCodeAt(0);
const CHAR_CODE_Z = 'z'.charCodeAt(0);
const CHAR_CODE_A_UPPER = 'A'.charCodeAt(0);
const CHAR_CODE_Z_UPPER = 'Z'.charCodeAt(0);
function rotateChar(char, min, key) {
    return String.fromCharCode(((char.charCodeAt(0) - min + key) % ALPHABET_LENGTH) + min);
}
function rotate(text, key) {
    const keyMod = key % ALPHABET_LENGTH;
    return Array.from(text, (char) => {
        const code = char.charCodeAt(0);
        if (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) {
            return rotateChar(char, CHAR_CODE_A, keyMod);
        }
        else if (code >= CHAR_CODE_A_UPPER && code <= CHAR_CODE_Z_UPPER) {
            return rotateChar(char, CHAR_CODE_A_UPPER, keyMod);
        }
        return char;
    }).join('');
}
exports.default = { rotate };
