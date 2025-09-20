"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const encodeMap = {
    a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q',
    k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g',
    u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a', '0': '0', '1': '1', '2': '2',
    '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
};
const decodeMap = {
    z: 'a', y: 'b', x: 'c', w: 'd', v: 'e', u: 'f', t: 'g', s: 'h', r: 'i', q: 'j',
    p: 'k', o: 'l', n: 'm', m: 'n', l: 'o', k: 'p', j: 'q', i: 'r', h: 's', g: 't',
    f: 'u', e: 'v', d: 'w', c: 'x', b: 'y', a: 'z', '0': '0', '1': '1', '2': '2',
    '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
};
function encode(plainText) {
    const normalizedText = plainText.replace(/\s+/g, '').toLowerCase();
    let encodedText = '';
    for (let i = 0; i < normalizedText.length; i++) {
        encodedText += encodeMap[normalizedText[i]];
    }
    let result = '';
    for (let i = 0; i < encodedText.length; i += 5) {
        result += encodedText.substring(i, Math.min(i + 5, encodedText.length));
        if (i + 5 < encodedText.length) {
            result += ' ';
        }
    }
    return result;
}
function decode(cipherText) {
    const normalizedText = cipherText.replace(/\s+/g, '').toLowerCase();
    let decodedText = '';
    for (let i = 0; i < normalizedText.length; i++) {
        decodedText += decodeMap[normalizedText[i]];
    }
    return decodedText;
}
