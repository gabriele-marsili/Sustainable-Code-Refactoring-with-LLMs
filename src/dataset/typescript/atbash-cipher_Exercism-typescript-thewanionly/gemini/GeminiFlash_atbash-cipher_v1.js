"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE;
const MULTIPLIER = 2;
const GROUP_LENGTH = 5;
const GROUP_SEPARATOR = ' ';
const cipherLetter = (charCode) => {
    if (charCode >= 48 && charCode <= 57) {
        return String.fromCharCode(charCode);
    }
    return String.fromCharCode(charCode + (OFFSET - (charCode - MIN_CHAR_CODE) * MULTIPLIER));
};
const cleanAndLower = (text) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = text.charCodeAt(i);
        if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            result += (charCode >= 65 && charCode <= 90) ? String.fromCharCode(charCode + 32) : char;
        }
    }
    return result;
};
function encode(plainText) {
    const cleanedText = cleanAndLower(plainText);
    let encoded = "";
    for (let i = 0; i < cleanedText.length; i++) {
        if (i > 0 && i % GROUP_LENGTH === 0) {
            encoded += GROUP_SEPARATOR;
        }
        encoded += cipherLetter(cleanedText.charCodeAt(i));
    }
    return encoded;
}
function decode(cipherText) {
    const cleanedText = cleanAndLower(cipherText);
    let decoded = "";
    for (let i = 0; i < cleanedText.length; i++) {
        decoded += cipherLetter(cleanedText.charCodeAt(i));
    }
    return decoded;
}
