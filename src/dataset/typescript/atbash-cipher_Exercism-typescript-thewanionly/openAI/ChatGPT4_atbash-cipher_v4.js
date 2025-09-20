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
const cipherLetter = (letter) => /^\d$/.test(letter)
    ? letter
    : String.fromCharCode(MIN_CHAR_CODE + OFFSET - (letter.charCodeAt(0) - MIN_CHAR_CODE) * MULTIPLIER);
const transcode = (text) => text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .split('')
    .map(cipherLetter)
    .join('');
function encode(plainText) {
    const transcoded = transcode(plainText);
    const result = [];
    for (let i = 0; i < transcoded.length; i++) {
        if (i > 0 && i % GROUP_LENGTH === 0)
            result.push(GROUP_SEPARATOR);
        result.push(transcoded[i]);
    }
    return result.join('');
}
function decode(cipherText) {
    return transcode(cipherText);
}
