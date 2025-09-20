"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    const matches = phrase.match(/[A-Z]+[a-z]*|[a-z]+/g);
    if (!matches)
        return "";
    let acronym = "";
    for (let i = 0; i < matches.length; i++) {
        acronym += matches[i][0].toUpperCase();
    }
    return acronym;
};
exports.parse = parse;
