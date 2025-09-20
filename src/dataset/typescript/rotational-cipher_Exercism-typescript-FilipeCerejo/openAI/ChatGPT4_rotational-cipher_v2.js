"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = rotate;
function rotate(sentence, shift) {
    const A_CODE = 65, Z_CODE = 90, a_CODE = 97, z_CODE = 122;
    shift = shift % 26;
    return Array.from(sentence, (char) => {
        const code = char.charCodeAt(0);
        if (code >= A_CODE && code <= Z_CODE) {
            return String.fromCharCode(((code - A_CODE + shift + 26) % 26) + A_CODE);
        }
        else if (code >= a_CODE && code <= z_CODE) {
            return String.fromCharCode(((code - a_CODE + shift + 26) % 26) + a_CODE);
        }
        return char;
    }).join('');
}
