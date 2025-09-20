"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    if (values.length === 0)
        return [];
    let totalBytes = 0;
    for (const value of values) {
        totalBytes += value === 0 ? 1 : Math.floor(Math.log2(value) / 7) + 1;
    }
    const result = new Array(totalBytes);
    let resultIndex = 0;
    for (const value of values) {
        resultIndex += u32_to_bytes_direct(value, result, resultIndex);
    }
    return result;
}
function u32_to_bytes_direct(value, target, startIndex) {
    if (value === 0) {
        target[startIndex] = 0;
        return 1;
    }
    const bytes = [];
    let tmp = value;
    while (tmp > 0) {
        bytes.push(tmp & 0x7f);
        tmp >>>= 7;
    }
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
        target[startIndex + i] = bytes[length - 1 - i] | (i === length - 1 ? 0 : MORE_BYTES_MARKER);
    }
    return length;
}
function u32_to_bytes(value) {
    if (value === 0)
        return [0];
    const bytes = [];
    let tmp = value;
    while (tmp > 0) {
        bytes.push(tmp & 0x7f);
        tmp >>>= 7;
    }
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
        bytes[i] |= (i === 0 ? 0 : MORE_BYTES_MARKER);
    }
    bytes.reverse();
    return bytes;
}
function decode(bytes) {
    if (bytes.length === 0)
        return [];
    if ((bytes[bytes.length - 1] & MORE_BYTES_MARKER) !== 0) {
        throw new Error('Incomplete sequence');
    }
    const result = [];
    let tmp = 0;
    for (const byte of bytes) {
        tmp = (tmp << 7) | (byte & 0x7f);
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
