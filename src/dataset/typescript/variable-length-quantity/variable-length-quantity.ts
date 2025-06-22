// Smells like Rust?
// Yes, it's translated from my Rust solution!
type Vec<T> = T[]
type u8 = number
type u32 = number

const MORE_BYTES_MARKER: u8 = 0x80

function encode(values: u32[]): Vec<u8> {
    const result: Vec<u8> = []
    for (const n of  values) {
        result.push(...u32_to_bytes(n))
    }
    return result
}

function u32_to_bytes(value: u32): Vec<u8> {
    const result: Vec<u8> = []
    let tmp = value
    while (true) {
        let bits7 = tmp & 0x7f
        if (result.length > 0) {
            bits7 |= MORE_BYTES_MARKER
        }
        tmp = Math.floor(tmp / 128)
        result.push(bits7)
        if (tmp <= 0) {
            break
        }
    }
    result.reverse()
    return result
}

function decode(bytes: u8[]): Vec<u32> {
    if (!is_finished(bytes[bytes.length - 1])) {
        throw  new Error('Incomplete sequence')
    }
    const result: Vec<u32> = []
    let tmp: u32 = 0
    let bytes_of_value_count = 0
    for (const byte of bytes) {
        bytes_of_value_count += 1
        tmp += (byte & 0x7f) as u32
        if (is_finished(byte)) {
            result.push(tmp)
            bytes_of_value_count = 0
            tmp = 0
        } else {
            tmp = tmp * 128
        }
    }
    return result
}

function is_finished(byte: u8): boolean {
    return (byte & MORE_BYTES_MARKER) === 0
}

export default {encode, decode}