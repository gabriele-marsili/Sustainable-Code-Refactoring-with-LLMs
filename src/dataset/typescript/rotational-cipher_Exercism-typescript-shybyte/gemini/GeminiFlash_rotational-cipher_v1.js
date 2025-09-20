"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_LENGTH = 26;
function rotateChar(char, min, key) {
    const charCode = char.charCodeAt(0);
    const rotatedCharCode = (charCode - min + key) % ALPHABET_LENGTH + min;
    return String.fromCharCode(rotatedCharCode);
}
function rotate(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) {
            result += rotateChar(char, 'a'.charCodeAt(0), key);
        }
        else if (charCode >= 65 && charCode <= 90) {
            result += rotateChar(char, 'A'.charCodeAt(0), key);
        }
        else {
            result += char;
        }
    }
    return result;
}
exports.default = { rotate };
