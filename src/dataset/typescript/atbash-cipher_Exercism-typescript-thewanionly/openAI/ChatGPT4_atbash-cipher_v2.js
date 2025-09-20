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
const cipherLetter = (letter) => {
    const charCode = letter.charCodeAt(0);
    return /^\d+$/.test(letter)
        ? letter
        : String.fromCharCode(charCode + (OFFSET - (charCode - MIN_CHAR_CODE) * MULTIPLIER));
};
const transcode = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // remove non-alphanumeric characters
        .split('')
        .map(cipherLetter)
        .join('');
};
function encode(plainText) {
    const transcoded = transcode(plainText);
    const result = [];
    for (let i = 0; i < transcoded.length; i += GROUP_LENGTH) {
        result.push(transcoded.slice(i, i + GROUP_LENGTH));
    }
    return result.join(GROUP_SEPARATOR);
}
function decode(cipherText) {
    return transcode(cipherText);
}
