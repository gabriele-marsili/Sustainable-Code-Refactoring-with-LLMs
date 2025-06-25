export function encode(input: string) {
    return input.replace(/(.)\1+/g, (chunk, char) => chunk.length + char)
}

export function decode(input: string) {
    return input.replace(/(\d+)(.)/g, (_pair, count, char) => char.repeat(count))
}

export default {encode, decode}