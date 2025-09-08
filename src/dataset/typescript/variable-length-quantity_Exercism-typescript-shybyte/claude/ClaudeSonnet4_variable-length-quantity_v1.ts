// Smells like Rust?
// Yes, it's translated from my Rust solution!
type Vec<T> = T[]
type u8 = number
type u32 = number

const MORE_BYTES_MARKER: u8 = 0x80

function encode(values: u32[]): Vec<u8> {
    let totalLength = 0
    for (const n of values) {
        let temp = n
        do {
            totalLength++
            temp = Math.floor(temp / 128)
        } while (temp > 0)
    }
    
    const result: Vec<u8> = new Array(totalLength)
    let index = 0
    
    for (const n of values) {
        const bytes = u32_to_bytes(n)
        for (let i = 0; i < bytes.length; i++) {
            result[index++] = bytes[i]
        }
    }
    return result
}

function u32_to_bytes(value: u32): Vec<u8> {
    if (value === 0) {
        return [0]
    }
    
    let byteCount = 0
    let temp = value
    while (temp > 0) {
        byteCount++
        temp = Math.floor(temp / 128)
    }
    
    const result: Vec<u8> = new Array(byteCount)
    temp = value
    
    for (let i = byteCount - 1; i >= 0; i--) {
        let bits7 = temp & 0x7f
        if (i > 0) {
            bits7 |= MORE_BYTES_MARKER
        }
        result[i] = bits7
        temp = Math.floor(temp / 128)
    }
    
    return result
}

function decode(bytes: u8[]): Vec<u32> {
    const lastByte = bytes[bytes.length - 1]
    if ((lastByte & MORE_BYTES_MARKER) !== 0) {
        throw new Error('Incomplete sequence')
    }
    
    const result: Vec<u32> = []
    let tmp: u32 = 0
    
    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i]
        tmp = tmp * 128 + (byte & 0x7f)
        
        if ((byte & MORE_BYTES_MARKER) === 0) {
            result.push(tmp)
            tmp = 0
        }
    }
    
    return result
}

function is_finished(byte: u8): boolean {
    return (byte & MORE_BYTES_MARKER) === 0
}

export default {encode, decode}