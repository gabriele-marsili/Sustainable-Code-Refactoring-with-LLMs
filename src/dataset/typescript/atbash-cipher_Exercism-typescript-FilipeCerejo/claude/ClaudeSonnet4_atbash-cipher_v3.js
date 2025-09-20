"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const ALPHABET_SIZE = 26;
const CHUNK_SIZE = 5;
function createAtbashMap() {
    const map = new Map();
    for (let i = 0; i < ALPHABET_SIZE; i++) {
        const char = String.fromCharCode(97 + i);
        const cipher = String.fromCharCode(122 - i);
        map.set(char, cipher);
        map.set(cipher, char);
    }
    for (let i = 0; i < 10; i++) {
        const digit = i.toString();
        map.set(digit, digit);
    }
    return map;
}
const atbashMap = createAtbashMap();
function encode(plainText) {
    const cleaned = plainText.replace(/\s+/g, '').toLowerCase();
    let encoded = '';
    for (let i = 0; i < cleaned.length; i++) {
        encoded += atbashMap.get(cleaned[i]) || cleaned[i];
    }
    return separate5(encoded);
}
function separate5(text) {
    if (text.length === 0)
        return '';
    const chunks = [];
    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
        chunks.push(text.slice(i, i + CHUNK_SIZE));
    }
    return chunks.join(' ');
}
function decode(cipherText) {
    const cleaned = cipherText.replace(/\s+/g, '').toLowerCase();
    let decoded = '';
    for (let i = 0; i < cleaned.length; i++) {
        decoded += atbashMap.get(cleaned[i]) || cleaned[i];
    }
    return decoded;
}
