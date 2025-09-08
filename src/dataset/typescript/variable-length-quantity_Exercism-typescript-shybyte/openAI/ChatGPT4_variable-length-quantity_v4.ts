type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (const n of values) {
        let tmp = n;
        const buffer: u8[] = [];
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

function decode(bytes: u8[]): Vec<u32> {
    const result: Vec<u32> = [];
    let tmp: u32 = 0;
    for (let i = 0, shift = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp |= (byte & 0x7f) << shift;
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp);
            tmp = 0;
            shift = 0;
        } else {
            shift += 7;
        }
    }
    if (tmp !== 0) {
        throw new Error('Incomplete sequence');
    }
    return result;
}

export default { encode, decode };