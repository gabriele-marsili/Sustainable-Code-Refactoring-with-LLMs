"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUpperCase = (s) => s >= 'A' && s <= 'Z';
const isLetter = (char) => (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
const wordToAcronym = (word) => {
    let acronym = word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i]))
            acronym += word[i];
    }
    return acronym;
};
const replacePunctuationWithSpace = (s) => {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        result += isLetter(s[i]) ? s[i] : ' ';
    }
    return result;
};
const parse = (s) => {
    const words = replacePunctuationWithSpace(s).split(/\s+/);
    let result = '';
    for (const word of words) {
        if (word)
            result += wordToAcronym(word);
    }
    return result;
};
exports.default = { parse };
