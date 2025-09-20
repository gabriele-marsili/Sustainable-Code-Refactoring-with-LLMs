"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    let acronym = "";
    let isNewWord = true;
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        if (/[A-Za-z]/.test(char)) {
            if (isNewWord || /[A-Z]/.test(char)) {
                acronym += char.toUpperCase();
                isNewWord = false;
            }
        }
        else {
            isNewWord = true;
        }
    }
    return acronym;
}
