type Vec<T> = T[]
type u8 = number
type u32 = number

const MORE_BYTES_MARKER: u8 = 0x80

function encode(values: u32[]): Vec<u8> {
    let totalBytes = 0
    for (const value of values) {
        let temp = value
        do {
            totalBytes++
            temp = Math.floor(temp / 128)
        } while (temp > 0)
    }
    
    const result = new Array<u8>(totalBytes)
    let resultIndex = 0
    
    for (const value of values) {
        const bytes = u32_to_bytes(value)
        for (let i = 0; i < bytes.length; i++) {
            result[resultIndex++] = bytes[i]
        }
    }
    
    return result
}

function u32_to_bytes(value: u32): Vec<u8> {
    if (value === 0) return [0]
    
    let byteCount = 0
    let temp = value
    while (temp > 0) {
        byteCount++
        temp = Math.floor(temp / 128)
    }
    
    const result = new Array<u8>(byteCount)
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
    if (bytes.length === 0 || !is_finished(bytes[bytes.length - 1])) {
        throw new Error('Incomplete sequence')
    }
    
    let valueCount = 0
    for (const byte of bytes) {
        if (is_finished(byte)) {
            valueCount++
        }
    }
    
    const result = new Array<u32>(valueCount)
    let resultIndex = 0
    let tmp: u32 = 0
    
    for (const byte of bytes) {
        tmp = tmp * 128 + (byte & 0x7f)
        if (is_finished(byte)) {
            result[resultIndex++] = tmp
            tmp = 0
        }
    }
    
    return result
}

function is_finished(byte: u8): boolean {
    return (byte & MORE_BYTES_MARKER) === 0
}

export default {encode, decode}