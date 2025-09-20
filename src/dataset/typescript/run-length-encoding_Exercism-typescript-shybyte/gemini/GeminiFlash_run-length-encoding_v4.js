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
    let countStr = "";
    for (let i = 0; i < input.length; i++) {
        if (/\d/.test(input[i])) {
            countStr += input[i];
        }
        else {
            const count = countStr === "" ? 1 : parseInt(countStr, 10);
            decoded += input[i].repeat(count);
            countStr = "";
        }
    }
    return decoded;
}
exports.default = { encode, decode };
