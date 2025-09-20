"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proverb = proverb;
function proverb(...words) {
    if (words.length === 0)
        return '';
    if (words.length === 1)
        return `And all for the want of a ${words[0]}.`;
    const lines = new Array(words.length);
    const lastIndex = words.length - 1;
    for (let i = 0; i < lastIndex; i++) {
        lines[i] = `For want of a ${words[i]} the ${words[i + 1]} was lost.`;
    }
    lines[lastIndex] = `And all for the want of a ${words[0]}.`;
    return lines.join('\n');
}
