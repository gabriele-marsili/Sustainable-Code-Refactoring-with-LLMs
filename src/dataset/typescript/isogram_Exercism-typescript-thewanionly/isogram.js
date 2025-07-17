"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(word) {
    const wordArray = word.toLowerCase().replace(/\W/g, '').split('');
    return new Set(wordArray).size === wordArray.length;
}
