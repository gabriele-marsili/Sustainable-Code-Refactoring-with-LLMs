"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const ALPHABET_SIZE = 26;
const A_CHAR_CODE = 97;
const Z_CHAR_CODE = 122;
const ZERO_CHAR_CODE = 48;
const NINE_CHAR_CODE = 57;
function atbashTransform(char) {
    const code = char.charCodeAt(0);
    if (code >= A_CHAR_CODE && code <= Z_CHAR_CODE) {
        return String.fromCharCode(Z_CHAR_CODE - (code - A_CHAR_CODE));
    }
    if (code >= ZERO_CHAR_CODE && code <= NINE_CHAR_CODE) {
        return char;
    }
    return char;
}
function encode(plainText) {
    const noWhiteSpaces = plainText.replace(/\s+/g, '');
    let transformed = '';
    for (let i = 0; i < noWhiteSpaces.length; i++) {
        transformed += atbashTransform(noWhiteSpaces[i].toLowerCase());
    }
    let result = '';
    for (let i = 0; i < transformed.length; i += 5) {
        if (i > 0)
            result += ' ';
        result += transformed.slice(i, i + 5);
    }
    return result;
}
function decode(cipherText) {
    const noWhiteSpaces = cipherText.replace(/\s+/g, '');
    let result = '';
    for (let i = 0; i < noWhiteSpaces.length; i++) {
        result += atbashTransform(noWhiteSpaces[i].toLowerCase());
    }
    return result;
}
