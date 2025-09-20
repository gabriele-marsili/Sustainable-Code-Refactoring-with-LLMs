"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = rotate;
function rotate(sentence, shift) {
    let result = "";
    const len = sentence.length;
    for (let i = 0; i < len; i++) {
        const char = sentence[i];
        const charCode = sentence.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shift) % 26 + 26) % 26 + 65);
        }
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shift) % 26 + 26) % 26 + 97);
        }
        else {
            result += char;
        }
    }
    return result;
}
