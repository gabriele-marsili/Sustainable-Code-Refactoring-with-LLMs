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
    if (isUpperCase(word))
        return word[0];
    let result = word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i])) {
            result += word[i];
        }
    }
    return result;
};
const parse = (s) => {
    let result = '';
    let currentWord = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (isLetter(char)) {
            currentWord += char;
        }
        else {
            if (currentWord) {
                result += wordToAcronym(currentWord);
                currentWord = '';
            }
        }
    }
    if (currentWord) {
        result += wordToAcronym(currentWord);
    }
    return result;
};
exports.default = { parse };
