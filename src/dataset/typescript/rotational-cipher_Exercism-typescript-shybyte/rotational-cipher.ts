const ALPHABET_LENGTH = 26

function rotateChar(char: string, min: number, key: number) {
    return String.fromCharCode((char.charCodeAt(0) - min + key) % ALPHABET_LENGTH + min)
}

function rotate(text: string, key: number) {
    return text
        .replace(/[a-z]/g, (c) => rotateChar(c, 'a'.charCodeAt(0), key))
        .replace(/[A-Z]/g, (c) => rotateChar(c, 'A'.charCodeAt(0), key))
}

export default {rotate}
