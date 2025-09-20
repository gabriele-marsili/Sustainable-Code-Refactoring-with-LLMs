"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (let i = 0; i < values.length; i++) {
        const n = values[i];
        const encoded = u32_to_bytes(n);
        for (let j = 0; j < encoded.length; j++) {
            result.push(encoded[j]);
        }
    }
    return result;
}
function u32_to_bytes(value) {
    const result = [];
    let tmp = value;
    do {
        let bits7 = tmp & 0x7f;
        tmp >>>= 7;
        if (tmp > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        result.push(bits7);
    } while (tmp > 0);
    return result.reverse();
}
function decode(bytes) {
    const result = [];
    let tmp = 0;
    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp = (tmp * 128) + (byte & 0x7f);
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
