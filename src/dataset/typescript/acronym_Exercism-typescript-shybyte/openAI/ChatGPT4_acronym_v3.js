"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUpperCase = (s) => s === s.toUpperCase();
const isLetter = (char) => /^[a-zA-Z]$/.test(char);
const wordToAcronym = (word) => {
    let acronym = word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i]))
            acronym += word[i];
    }
    return acronym;
};
const replacePunctuationWithSpace = (s) => s.replace(/[^a-zA-Z]/g, ' ');
const parse = (s) => {
    return replacePunctuationWithSpace(s)
        .trim()
        .split(/\s+/)
        .map(wordToAcronym)
        .join('');
};
exports.default = { parse };
