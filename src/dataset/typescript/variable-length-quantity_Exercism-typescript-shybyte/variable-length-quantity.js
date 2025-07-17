"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (const n of values) {
        result.push(...u32_to_bytes(n));
    }
    return result;
}
function u32_to_bytes(value) {
    const result = [];
    let tmp = value;
    while (true) {
        let bits7 = tmp & 0x7f;
        if (result.length > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        tmp = Math.floor(tmp / 128);
        result.push(bits7);
        if (tmp <= 0) {
            break;
        }
    }
    result.reverse();
    return result;
}
function decode(bytes) {
    if (!is_finished(bytes[bytes.length - 1])) {
        throw new Error('Incomplete sequence');
    }
    const result = [];
    let tmp = 0;
    let bytes_of_value_count = 0;
    for (const byte of bytes) {
        bytes_of_value_count += 1;
        tmp += (byte & 0x7f);
        if (is_finished(byte)) {
            result.push(tmp);
            bytes_of_value_count = 0;
            tmp = 0;
        }
        else {
            tmp = tmp * 128;
        }
    }
    return result;
}
function is_finished(byte) {
    return (byte & MORE_BYTES_MARKER) === 0;
}
exports.default = { encode, decode };
