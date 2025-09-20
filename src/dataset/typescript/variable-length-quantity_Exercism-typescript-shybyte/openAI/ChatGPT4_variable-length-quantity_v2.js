"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (const n of values) {
        let tmp = n;
        const stack = [];
        do {
            let bits7 = tmp & 0x7f;
            if (stack.length > 0) {
                bits7 |= MORE_BYTES_MARKER;
            }
            stack.push(bits7);
            tmp >>>= 7;
        } while (tmp > 0);
        result.push(...stack.reverse());
    }
    return result;
}
function decode(bytes) {
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
exports.default = { encode, decode };
