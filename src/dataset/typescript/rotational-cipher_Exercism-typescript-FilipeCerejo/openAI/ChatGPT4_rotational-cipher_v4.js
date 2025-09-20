"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = rotate;
function rotate(sentence, shift) {
    const shiftChar = (char, base) => String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    return Array.from(sentence, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90)
            return shiftChar(char, 65);
        if (code >= 97 && code <= 122)
            return shiftChar(char, 97);
        return char;
    }).join('');
}
