"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    const words = phrase.split(/[\s-]+/);
    let acronym = "";
    for (const word of words) {
        if (word.length > 0) {
            acronym += word.charAt(0).toUpperCase();
        }
    }
    return acronym;
};
exports.parse = parse;
