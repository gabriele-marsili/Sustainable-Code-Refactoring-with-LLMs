"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(input) {
    if (!input)
        return input;
    let result = '';
    let currentChar = input[0];
    let count = 1;
    for (let i = 1; i < input.length; i++) {
        if (input[i] === currentChar) {
            count++;
        }
        else {
            result += count > 1 ? count + currentChar : currentChar;
            currentChar = input[i];
            count = 1;
        }
    }
    result += count > 1 ? count + currentChar : currentChar;
    return result;
}
function decode(input) {
    if (!input)
        return input;
    let result = '';
    let i = 0;
    while (i < input.length) {
        let count = 0;
        while (i < input.length && input[i] >= '0' && input[i] <= '9') {
            count = count * 10 + (input.charCodeAt(i) - 48);
            i++;
        }
        if (count > 0 && i < input.length) {
            const char = input[i];
            for (let j = 0; j < count; j++) {
                result += char;
            }
            i++;
        }
        else if (i < input.length) {
            result += input[i];
            i++;
        }
    }
    return result;
}
