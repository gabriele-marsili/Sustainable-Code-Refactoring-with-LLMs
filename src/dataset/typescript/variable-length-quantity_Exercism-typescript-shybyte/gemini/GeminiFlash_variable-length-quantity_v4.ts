type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (const n of values) {
        let tmp = n;
        const bytes: Vec<u8> = [];
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

function decode(bytes: u8[]): Vec<u32> {
    const result: Vec<u32> = [];
    let tmp: u32 = 0;
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

export default { encode, decode };