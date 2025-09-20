"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const alphabet = {
    a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q',
    k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g',
    u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a', '0': '0', '1': '1', '2': '2',
    '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
};
const chiperbet = Object.fromEntries(Object.entries(alphabet).map(([key, value]) => [value, key]));
function encode(plainText) {
    var _a;
    const noWhiteSpaces = plainText.replace(/\s+/g, '');
    const encoded = Array.from(noWhiteSpaces, char => alphabet[char.toLowerCase()] || '').join('');
    return ((_a = encoded.match(/.{1,5}/g)) === null || _a === void 0 ? void 0 : _a.join(' ')) || '';
}
function decode(cipherText) {
    const noWhiteSpaces = cipherText.replace(/\s+/g, '');
    return Array.from(noWhiteSpaces, char => chiperbet[char.toLowerCase()] || '').join('');
}
