"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(input) {
    return input.replace(/(.)\1+/g, (chunk, char) => chunk.length + char);
}
function decode(input) {
    return input.replace(/(\d+)(.)/g, (_pair, count, char) => char.repeat(count));
}
exports.default = { encode, decode };
