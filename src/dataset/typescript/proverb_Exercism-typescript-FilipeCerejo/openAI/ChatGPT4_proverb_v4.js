"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proverb = proverb;
function proverb(...words) {
    if (words.length === 0)
        return '';
    const firstWord = words[0];
    return words
        .slice(0, -1)
        .map((word, idx) => `For want of a ${word} the ${words[idx + 1]} was lost.`)
        .concat(`And all for the want of a ${firstWord}.`)
        .join('\n');
}
