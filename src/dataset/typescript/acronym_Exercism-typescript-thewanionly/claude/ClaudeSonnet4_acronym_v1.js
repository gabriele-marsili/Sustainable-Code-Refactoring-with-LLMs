"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    let result = '';
    let inWord = false;
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        const code = char.charCodeAt(0);
        // Check if character is alphanumeric (word character)
        const isWordChar = (code >= 48 && code <= 57) || // 0-9
            (code >= 65 && code <= 90) || // A-Z
            (code >= 97 && code <= 122); // a-z
        if (isWordChar && !inWord) {
            // First character of a new word
            result += code >= 97 ? String.fromCharCode(code - 32) : char; // Convert to uppercase
            inWord = true;
        }
        else if (!isWordChar) {
            inWord = false;
        }
    }
    return result;
}
