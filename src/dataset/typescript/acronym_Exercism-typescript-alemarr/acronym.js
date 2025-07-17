"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    let acronym = "";
    const matches = phrase.match(/[A-Z]+[a-z]*|[a-z]+/g) || [];
    matches.forEach((match) => acronym += match.charAt(0).toUpperCase());
    return acronym;
};
exports.parse = parse;
