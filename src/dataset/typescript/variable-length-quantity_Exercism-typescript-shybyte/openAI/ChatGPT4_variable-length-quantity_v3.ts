type Vec<T> = T[];
type u8 = number;
type u32 = number;

const MORE_BYTES_MARKER: u8 = 0x80;

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = [];
    for (let i = 0; i < values.length; i++) {
        let value = values[i];
        const temp: Vec<u8> = [];
        do {
            let byte = value & 0x7f;
            value >>>= 7;
            if (temp.length > 0) byte |= MORE_BYTES_MARKER;
            temp.push(byte);
        } while (value > 0);
        result.push(...temp.reverse());
    }
    return result;
}

function decode(bytes: u8[]): Vec<u32> {
    const result: Vec<u32> = [];
    let tmp: u32 = 0;
    let shift = 0;

    for (let i = 0; i < bytes.length; i++) {
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

    if (shift !== 0) {
        throw new Error('Incomplete sequence');
    }

    return result;
}

export default { encode, decode };