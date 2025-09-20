"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_LENGTH = 26;
function rotateChar(charCode, min, key) {
    return String.fromCharCode((charCode - min + key) % ALPHABET_LENGTH + min);
}
function rotate(text, key) {
    const aCode = 'a'.charCodeAt(0);
    const ACode = 'A'.charCodeAt(0);
    return Array.from(text, (char) => {
        const charCode = char.charCodeAt(0);
        if (char >= 'a' && char <= 'z') {
            return rotateChar(charCode, aCode, key);
        }
        else if (char >= 'A' && char <= 'Z') {
            return rotateChar(charCode, ACode, key);
        }
        return char;
    }).join('');
}
exports.default = { rotate };
