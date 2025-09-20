"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proverb;
function proverb(...nouns) {
    if (!nouns || nouns.length === 0) {
        return "";
    }
    const lines = [];
    for (let i = 0; i < nouns.length - 1; i++) {
        lines.push(`For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.`);
    }
    lines.push(`And all for the want of a ${nouns[0]}.`);
    return lines.join('\n');
}
