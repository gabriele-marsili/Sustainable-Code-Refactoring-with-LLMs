"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    if (!uncoded)
        return "";
    let result = "";
    let currentChar = uncoded[0];
    let count = 1;
    for (let i = 1; i < uncoded.length; i++) {
        if (uncoded[i] === currentChar) {
            count++;
        }
        else {
            result += (count > 1 ? count : "") + currentChar;
            currentChar = uncoded[i];
            count = 1;
        }
    }
    result += (count > 1 ? count : "") + currentChar;
    return result;
}
function decode(coded) {
    if (!coded)
        return "";
    let result = "";
    let i = 0;
    while (i < coded.length) {
        let j = i;
        while (j < coded.length && !isNaN(Number(coded[j]))) {
            j++;
        }
        const repeatCount = j > i ? Number(coded.substring(i, j)) : 1;
        const char = coded[j];
        result += char.repeat(repeatCount);
        i = j + 1;
    }
    return result;
}
