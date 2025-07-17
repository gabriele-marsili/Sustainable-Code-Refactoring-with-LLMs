"use strict";
/**
 * This solution might seem to be unnecessary complicated,
 * but a simple JS RegExp approach would not work e.g. for
 * https://en.wikipedia.org/wiki/Germanic_umlaut.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const isUpperCase = (s) => s === s.toUpperCase();
// This might be wrong in some languages.
const isLetter = (char) => char.toUpperCase() !== char.toLowerCase();
const wordToAcronym = (word) => {
    const [head, ...tail] = word;
    return isUpperCase(word)
        ? head
        : head.toUpperCase() + tail.filter(isUpperCase).join('');
};
const replacePunctuationWithSpace = (s) => s.replace(/./g, (s) => isLetter(s) ? s : ' ');
const parse = (s) => {
    const words = replacePunctuationWithSpace(s).trim().split(/\s+/);
    return words.map(wordToAcronym).join('');
};
exports.default = { parse };
