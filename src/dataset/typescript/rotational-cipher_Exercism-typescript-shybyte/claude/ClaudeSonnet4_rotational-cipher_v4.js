"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_LENGTH = 26;
const A_CHAR_CODE = 97;
const Z_CHAR_CODE = 65;
function rotateChar(char, min, key) {
    return String.fromCharCode((char.charCodeAt(0) - min + key) % ALPHABET_LENGTH + min);
}
function rotate(text, key) {
    const normalizedKey = ((key % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
    if (normalizedKey === 0)
        return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= A_CHAR_CODE && charCode <= A_CHAR_CODE + 25) {
            result += String.fromCharCode((charCode - A_CHAR_CODE + normalizedKey) % ALPHABET_LENGTH + A_CHAR_CODE);
        }
        else if (charCode >= Z_CHAR_CODE && charCode <= Z_CHAR_CODE + 25) {
            result += String.fromCharCode((charCode - Z_CHAR_CODE + normalizedKey) % ALPHABET_LENGTH + Z_CHAR_CODE);
        }
        else {
            result += text[i];
        }
    }
    return result;
}
exports.default = { rotate };
