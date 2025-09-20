"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    if (!uncoded)
        return '';
    let result = '';
    let currentChar = uncoded[0];
    let count = 1;
    for (let i = 1; i < uncoded.length; i++) {
        if (uncoded[i] === currentChar) {
            count++;
        }
        else {
            result += count > 1 ? count + currentChar : currentChar;
            currentChar = uncoded[i];
            count = 1;
        }
    }
    result += count > 1 ? count + currentChar : currentChar;
    return result;
}
function decode(coded) {
    if (!coded)
        return '';
    let result = '';
    let numStr = '';
    for (let i = 0; i < coded.length; i++) {
        const char = coded[i];
        const charCode = char.charCodeAt(0);
        if (charCode >= 48 && charCode <= 57) { // '0' to '9'
            numStr += char;
        }
        else {
            const count = numStr ? parseInt(numStr) : 1;
            result += char.repeat(count);
            numStr = '';
        }
    }
    return result;
}
