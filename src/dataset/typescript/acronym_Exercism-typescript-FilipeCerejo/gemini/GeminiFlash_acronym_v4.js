"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    const words = phrase.split(/[\s:_-]+/);
    let acronym = "";
    for (const word of words) {
        if (word.length > 0) {
            acronym += word[0].toUpperCase();
        }
    }
    return acronym;
}
