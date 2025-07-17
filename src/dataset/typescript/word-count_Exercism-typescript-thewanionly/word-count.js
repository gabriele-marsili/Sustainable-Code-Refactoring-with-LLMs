"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(phrase) {
    const wordsArray = phrase
        .replace(/  +/g, ' ') //collapse multiple spaces into one
        .trim() //remove leading and trailing whitepsaces
        .toLowerCase()
        .split(/\s/g); // split by whitespace (i.e. spaces, tabs and newlines)
    // Store all words as keys of a map with the word count as value
    return wordsArray.reduce((acc, currWord) => { var _a; return acc.set(currWord, ((_a = acc.get(currWord)) !== null && _a !== void 0 ? _a : 0) + 1); }, new Map());
}
