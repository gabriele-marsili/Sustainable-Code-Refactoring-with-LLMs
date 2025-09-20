"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    let totalLength = 0;
    for (const n of values) {
        let temp = n;
        do {
            totalLength++;
            temp = Math.floor(temp / 128);
        } while (temp > 0);
    }
    const result = new Array(totalLength);
    let index = 0;
    for (const n of values) {
        const bytes = u32_to_bytes(n);
        for (let i = 0; i < bytes.length; i++) {
            result[index++] = bytes[i];
        }
    }
    return result;
}
function u32_to_bytes(value) {
    if (value === 0) {
        return [0];
    }
    let byteCount = 0;
    let temp = value;
    while (temp > 0) {
        byteCount++;
        temp = Math.floor(temp / 128);
    }
    const result = new Array(byteCount);
    temp = value;
    for (let i = byteCount - 1; i >= 0; i--) {
        let bits7 = temp & 0x7f;
        if (i > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        result[i] = bits7;
        temp = Math.floor(temp / 128);
    }
    return result;
}
function decode(bytes) {
    const lastByte = bytes[bytes.length - 1];
    if ((lastByte & MORE_BYTES_MARKER) !== 0) {
        throw new Error('Incomplete sequence');
    }
    const result = [];
    let tmp = 0;
    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp = tmp * 128 + (byte & 0x7f);
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp);
            tmp = 0;
        }
    }
    return result;
}
function is_finished(byte) {
    return (byte & MORE_BYTES_MARKER) === 0;
}
exports.default = { encode, decode };
