"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = void 0;
const TOTAL_CHARS = 26;
const isPangram = (sentence) => {
    const onlyAlphabeticChars = sentence
        .toLowerCase()
        .replace(/([^a-z])/g, "")
        .split("");
    onlyAlphabeticChars.sort();
    const uniqueChars = onlyAlphabeticChars.join("").replace(/(.+)(?=\1)/g, "");
    const containsAllLetters = uniqueChars.length == TOTAL_CHARS;
    return containsAllLetters;
};
exports.isPangram = isPangram;
