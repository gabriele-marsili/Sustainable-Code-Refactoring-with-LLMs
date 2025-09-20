"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    let acronym = '';
    let i = 0;
    const len = phrase.length;
    while (i < len) {
        const char = phrase[i];
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            acronym += char.toUpperCase();
            i++;
            while (i < len && phrase[i] >= 'a' && phrase[i] <= 'z') {
                i++;
            }
        }
        else {
            i++;
        }
    }
    return acronym;
}
