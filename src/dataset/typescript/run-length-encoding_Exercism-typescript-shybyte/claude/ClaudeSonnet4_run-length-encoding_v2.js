"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(input) {
    let result = '';
    let i = 0;
    const len = input.length;
    while (i < len) {
        const char = input[i];
        let count = 1;
        while (i + count < len && input[i + count] === char) {
            count++;
        }
        if (count > 1) {
            result += count + char;
        }
        else {
            result += char;
        }
        i += count;
    }
    return result;
}
function decode(input) {
    let result = '';
    let i = 0;
    const len = input.length;
    while (i < len) {
        if (input[i] >= '0' && input[i] <= '9') {
            let count = 0;
            while (i < len && input[i] >= '0' && input[i] <= '9') {
                count = count * 10 + (input.charCodeAt(i) - 48);
                i++;
            }
            if (i < len) {
                const char = input[i];
                for (let j = 0; j < count; j++) {
                    result += char;
                }
                i++;
            }
        }
        else {
            result += input[i];
            i++;
        }
    }
    return result;
}
exports.default = { encode, decode };
