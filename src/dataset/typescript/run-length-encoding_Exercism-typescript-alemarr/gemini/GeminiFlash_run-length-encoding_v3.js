"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(input) {
    let encoded = "";
    let count = 1;
    for (let i = 0; i < input.length; i++) {
        if (i + 1 < input.length && input[i] === input[i + 1]) {
            count++;
        }
        else {
            encoded += (count > 1 ? count : "") + input[i];
            count = 1;
        }
    }
    return encoded;
}
function decode(input) {
    let decoded = "";
    let numStr = "";
    for (let i = 0; i < input.length; i++) {
        if (/\d/.test(input[i])) {
            numStr += input[i];
        }
        else {
            const count = numStr === "" ? 1 : parseInt(numStr, 10);
            decoded += input[i].repeat(count);
            numStr = "";
        }
    }
    return decoded;
}
