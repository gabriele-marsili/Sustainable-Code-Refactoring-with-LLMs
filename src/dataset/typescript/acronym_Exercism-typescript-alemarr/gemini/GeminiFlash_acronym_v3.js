"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    const matches = phrase.split(/[\s-]+/).filter(Boolean);
    let acronym = "";
    for (const match of matches) {
        acronym += match.charAt(0).toUpperCase();
    }
    return acronym;
};
exports.parse = parse;
