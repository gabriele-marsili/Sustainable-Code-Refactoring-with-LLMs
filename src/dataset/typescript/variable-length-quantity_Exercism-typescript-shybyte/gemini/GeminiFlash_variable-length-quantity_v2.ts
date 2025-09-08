type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;
const SEVEN_BITS: u8 = 0x7f;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (const n of values) {
        u32_to_bytes(n, result);
    }
    return result;
}

function u32_to_bytes(value: u32, result: Vec<u8>): void {
    const buffer: Vec<u8> = [];
    let tmp = value;
    do {
        let bits7: u8 = tmp & SEVEN_BITS;
        tmp = Math.floor(tmp / 128);
        if (tmp > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        buffer.push(bits7);
    } while (tmp > 0);

    for (let i = buffer.length - 1; i >= 0; i--) {
        result.push(buffer[i]);
    }
}


function decode(bytes: u8[]): Vec<u32> {
    const result: Vec<u32> = [];
    let tmp: u32 = 0;

    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp = (tmp * 128) + (byte & SEVEN_BITS);

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


function is_finished(byte: u8): boolean {
    return (byte & MORE_BYTES_MARKER) === 0;
}

export default { encode, decode };