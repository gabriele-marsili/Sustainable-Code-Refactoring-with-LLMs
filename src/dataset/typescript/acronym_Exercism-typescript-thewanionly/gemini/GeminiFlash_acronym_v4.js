"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    const words = phrase.toUpperCase().split(/[^A-Z]/).filter(Boolean);
    let acronym = "";
    for (const word of words) {
        acronym += word.charAt(0);
    }
    return acronym;
}
