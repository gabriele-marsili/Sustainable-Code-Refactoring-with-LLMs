"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proverb = proverb;
function proverb(...words) {
    if (words.length === 0)
        return '';
    const result = [];
    for (let i = 0; i < words.length - 1; i++) {
        result.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.`);
    }
    result.push(`And all for the want of a ${words[0]}.`);
    return result.join('\n');
}
