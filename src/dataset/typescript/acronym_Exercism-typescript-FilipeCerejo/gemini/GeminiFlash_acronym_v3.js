"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    const words = phrase.split(/[\s:]+/);
    let acronym = "";
    for (const word of words) {
        if (word) {
            acronym += word[0].toUpperCase();
        }
    }
    return acronym;
}
