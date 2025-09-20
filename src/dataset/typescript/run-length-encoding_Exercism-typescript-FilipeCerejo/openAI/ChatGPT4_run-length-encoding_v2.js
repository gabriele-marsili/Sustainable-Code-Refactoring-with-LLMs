"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    let result = '';
    let count = 1;
    for (let i = 1; i <= uncoded.length; i++) {
        if (uncoded[i] === uncoded[i - 1]) {
            count++;
        }
        else {
            result += (count > 1 ? count : '') + uncoded[i - 1];
            count = 1;
        }
    }
    return result;
}
function decode(coded) {
    let result = '';
    let count = 0;
    for (const char of coded) {
        if (!isNaN(Number(char))) {
            count = count * 10 + Number(char);
        }
        else {
            result += char.repeat(count || 1);
            count = 0;
        }
    }
    return result;
}
