"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    let result = '';
    let isPrevUpper = false;
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        if (/[A-Z]/.test(char)) {
            if (!isPrevUpper)
                result += ' ';
            result += char;
            isPrevUpper = true;
        }
        else if (/\W/.test(char)) {
            isPrevUpper = false;
        }
        else {
            if (!isPrevUpper)
                result += ' ';
            result += char[0];
            isPrevUpper = false;
        }
    }
    return result
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
}
