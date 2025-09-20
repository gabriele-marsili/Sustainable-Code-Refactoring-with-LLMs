"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(input) {
    let result = '';
    let count = 1;
    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        }
        else {
            result += count + input[i - 1];
            count = 1;
        }
    }
    return result;
}
function decode(input) {
    let result = '';
    let i = 0;
    while (i < input.length) {
        let count = 0;
        while (i < input.length && !isNaN(Number(input[i]))) {
            count = count * 10 + Number(input[i]);
            i++;
        }
        if (i < input.length) {
            result += input[i].repeat(count);
            i++;
        }
    }
    return result;
}
