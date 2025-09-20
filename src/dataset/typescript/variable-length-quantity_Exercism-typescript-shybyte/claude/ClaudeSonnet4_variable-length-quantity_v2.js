"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const totalLength = values.reduce((sum, n) => sum + getByteLength(n), 0);
    const result = new Array(totalLength);
    let index = 0;
    for (const n of values) {
        index += u32_to_bytes_direct(n, result, index);
    }
    return result;
}
function getByteLength(value) {
    if (value === 0)
        return 1;
    return Math.floor(Math.log2(value) / 7) + 1;
}
function u32_to_bytes_direct(value, target, startIndex) {
    if (value === 0) {
        target[startIndex] = 0;
        return 1;
    }
    let tmp = value;
    let length = 0;
    // Calculate length first
    let tempValue = value;
    while (tempValue > 0) {
        length++;
        tempValue = Math.floor(tempValue / 128);
    }
    // Fill bytes from right to left
    for (let i = length - 1; i >= 0; i--) {
        const bits7 = tmp & 0x7f;
        target[startIndex + i] = i === length - 1 ? bits7 : bits7 | MORE_BYTES_MARKER;
        tmp = Math.floor(tmp / 128);
    }
    return length;
}
function u32_to_bytes(value) {
    const length = getByteLength(value);
    const result = new Array(length);
    u32_to_bytes_direct(value, result, 0);
    return result;
}
function decode(bytes) {
    const lastByte = bytes[bytes.length - 1];
    if ((lastByte & MORE_BYTES_MARKER) !== 0) {
        throw new Error('Incomplete sequence');
    }
    const result = [];
    let tmp = 0;
    for (const byte of bytes) {
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
