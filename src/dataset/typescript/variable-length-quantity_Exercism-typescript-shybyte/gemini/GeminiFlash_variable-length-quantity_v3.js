"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
const SEVEN_BITS = 0x7f;
const BASE = 128;
function encode(values) {
    const result = [];
    for (const n of values) {
        u32_to_bytes(n, result);
    }
    return result;
}
function u32_to_bytes(value, result) {
    const buffer = [];
    let tmp = value;
    do {
        let bits7 = tmp & SEVEN_BITS;
        tmp = Math.floor(tmp / BASE);
        if (tmp > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        buffer.push(bits7);
    } while (tmp > 0);
    for (let i = buffer.length - 1; i >= 0; i--) {
        result.push(buffer[i]);
    }
}
function decode(bytes) {
    const result = [];
    let tmp = 0;
    for (const byte of bytes) {
        tmp = (tmp * BASE) + (byte & SEVEN_BITS);
        if (is_finished(byte)) {
            result.push(tmp);
            tmp = 0;
        }
    }
    if (tmp !== 0) {
        throw new Error('Incomplete sequence');
    }
    return result;
}
function is_finished(byte) {
    return (byte & MORE_BYTES_MARKER) === 0;
}
exports.default = { encode, decode };
