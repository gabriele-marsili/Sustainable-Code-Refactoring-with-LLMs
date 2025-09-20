"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MORE_BYTES_MARKER = 0x80;
function encode(values) {
    const result = [];
    for (let i = 0; i < values.length; i++) {
        let value = values[i];
        const temp = [];
        do {
            let byte = value & 0x7f;
            value >>>= 7;
            if (temp.length > 0)
                byte |= MORE_BYTES_MARKER;
            temp.push(byte);
        } while (value > 0);
        result.push(...temp.reverse());
    }
    return result;
}
function decode(bytes) {
    const result = [];
    let tmp = 0;
    let shift = 0;
    for (let i = 0; i < bytes.length; i++) {
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
    if (shift !== 0) {
        throw new Error('Incomplete sequence');
    }
    return result;
}
exports.default = { encode, decode };
