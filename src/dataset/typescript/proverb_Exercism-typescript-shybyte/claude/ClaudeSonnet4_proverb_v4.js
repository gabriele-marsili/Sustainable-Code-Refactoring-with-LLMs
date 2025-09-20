"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proverb;
function proverb(...nouns) {
    if (nouns.length === 0)
        return '';
    if (nouns.length === 1)
        return `And all for the want of a ${nouns[0]}.`;
    const lines = new Array(nouns.length);
    const lastIndex = nouns.length - 1;
    for (let i = 0; i < lastIndex; i++) {
        lines[i] = `For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.`;
    }
    lines[lastIndex] = `And all for the want of a ${nouns[0]}.`;
    return lines.join('\n');
}
