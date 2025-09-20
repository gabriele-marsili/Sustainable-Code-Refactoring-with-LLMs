"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (const n of values) {
        let tmp = n;
        const bytes = [];
        while (true) {
            let bits7 = tmp & 0x7f;
            tmp = Math.floor(tmp / 128);
            if (tmp > 0) {
                bits7 |= MORE_BYTES_MARKER;
            }
            bytes.push(bits7);
            if (tmp <= 0) {
                break;
            }
        }
        for (let i = bytes.length - 1; i >= 0; i--) {
            result.push(bytes[i]);
        }
    }
    return result;
}
function decode(bytes) {
    const result = [];
    let tmp = 0;
    for (const byte of bytes) {
        tmp = (tmp * 128) + (byte & 0x7f);
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp);
            tmp = 0;
        }
    }
    if (tmp !== 0) {
        throw new Error('Incomplete sequence');
    }
    return result;
}
exports.default = { encode, decode };
