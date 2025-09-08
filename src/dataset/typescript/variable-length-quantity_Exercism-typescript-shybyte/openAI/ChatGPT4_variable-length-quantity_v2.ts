type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (const n of values) {
        let tmp = n;
        const stack: Vec<u8> = [];
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

function decode(bytes: u8[]): Vec<u32> {
    if ((bytes[bytes.length - 1] & MORE_BYTES_MARKER) !== 0) {
        throw new Error('Incomplete sequence');
    }
    const result: Vec<u32> = [];
    let tmp: u32 = 0;
    for (const byte of bytes) {
        tmp = (tmp << 7) | (byte & 0x7f);
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp);
            tmp = 0;
        }
    }
    return result;
}

export default { encode, decode };