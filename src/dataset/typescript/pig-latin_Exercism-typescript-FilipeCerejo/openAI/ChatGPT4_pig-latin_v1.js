"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(word) {
    return word
        .split(' ')
        .map((w) => {
        const lowerWord = w.toLowerCase();
        if (/^[aeiou]/.test(lowerWord)) {
            return lowerWord + 'ay';
        }
        const match = lowerWord.match(/^(ch|qu|squ|th|thr|sch)|^[^aeiou]/);
        if (match) {
            const cluster = match[0];
            return lowerWord.slice(cluster.length) + cluster + 'ay';
        }
        return lowerWord;
    })
        .join(' ');
}
