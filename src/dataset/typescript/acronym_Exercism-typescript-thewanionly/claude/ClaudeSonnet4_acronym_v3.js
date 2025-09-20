"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    let result = '';
    let prevChar = '';
    let wordStart = true;
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        if (/[A-Za-z0-9]/.test(char)) {
            if (wordStart) {
                result += char.toUpperCase();
                wordStart = false;
            }
            else if (/[A-Z]/.test(char) && /[a-z]/.test(prevChar)) {
                result += char;
                wordStart = false;
            }
        }
        else {
            wordStart = true;
        }
        prevChar = char;
    }
    return result;
}
