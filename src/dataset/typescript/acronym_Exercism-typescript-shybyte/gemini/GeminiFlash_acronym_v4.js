"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUpperCase = (s) => s === s.toUpperCase();
const isLetter = (char) => {
    const upper = char.toUpperCase();
    return upper !== char.toLowerCase();
};
const wordToAcronym = (word) => {
    let acronym = "";
    acronym += word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i])) {
            acronym += word[i];
        }
    }
    return acronym;
};
const replacePunctuationWithSpace = (s) => {
    let result = "";
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        result += isLetter(char) ? char : ' ';
    }
    return result;
};
const parse = (s) => {
    const replaced = replacePunctuationWithSpace(s);
    const trimmed = replaced.trim();
    const words = trimmed.split(/\s+/);
    return words.map(wordToAcronym).join('');
};
exports.default = { parse };
