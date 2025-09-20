"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proverb;
function proverb(...nouns) {
    if (nouns.length === 0)
        return '';
    const result = [];
    for (let i = 0; i < nouns.length - 1; i++) {
        result.push(`For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.`);
    }
    result.push(`And all for the want of a ${nouns[0]}.`);
    return result.join('\n');
}
