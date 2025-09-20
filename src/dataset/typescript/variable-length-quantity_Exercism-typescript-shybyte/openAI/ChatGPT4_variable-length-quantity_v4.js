"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (const n of values) {
        let tmp = n;
        const buffer = [];
        do {
            let bits7 = tmp & 0x7f;
            if (buffer.length > 0) {
                bits7 |= MORE_BYTES_MARKER;
            }
            buffer.push(bits7);
            tmp >>>= 7;
        } while (tmp > 0);
        result.push(...buffer.reverse());
    }
    return result;
}
function decode(bytes) {
    const result = [];
    let tmp = 0;
    for (let i = 0, shift = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp |= (byte & 0x7f) << shift;
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp);
            tmp = 0;
            shift = 0;
        }
        else {
            shift += 7;
        }
    }
    if (tmp !== 0) {
        throw new Error('Incomplete sequence');
    }
    return result;
}
exports.default = { encode, decode };
