"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_LENGTH = 26;
const LOWERCASE_A = 97;
const UPPERCASE_A = 65;
function rotate(text, key) {
    const normalizedKey = ((key % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
    if (normalizedKey === 0)
        return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= LOWERCASE_A && charCode <= LOWERCASE_A + 25) {
            result += String.fromCharCode((charCode - LOWERCASE_A + normalizedKey) % ALPHABET_LENGTH + LOWERCASE_A);
        }
        else if (charCode >= UPPERCASE_A && charCode <= UPPERCASE_A + 25) {
            result += String.fromCharCode((charCode - UPPERCASE_A + normalizedKey) % ALPHABET_LENGTH + UPPERCASE_A);
        }
        else {
            result += text[i];
        }
    }
    return result;
}
exports.default = { rotate };
