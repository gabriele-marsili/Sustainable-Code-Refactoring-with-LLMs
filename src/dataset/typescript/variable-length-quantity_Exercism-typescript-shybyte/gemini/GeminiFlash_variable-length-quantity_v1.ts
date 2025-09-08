type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (let i = 0; i < values.length; i++) {
        const n = values[i];
        const encoded = u32_to_bytes(n);
        for (let j = 0; j < encoded.length; j++) {
            result.push(encoded[j]);
        }
    }
    return result;
}

function u32_to_bytes(value: u32): Vec<u8> {
    const result: Vec<u8> = [];
    let tmp = value;
    do {
        let bits7 = tmp & 0x7f;
        tmp >>>= 7;
        if (tmp > 0) {
            bits7 |= MORE_BYTES_MARKER;
        }
        result.push(bits7);
    } while (tmp > 0);

    return result.reverse();
}

function decode(bytes: u8[]): Vec<u32> {
    const result: Vec<u32> = [];
    let tmp: u32 = 0;
    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        tmp = (tmp * 128) + (byte & 0x7f);
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