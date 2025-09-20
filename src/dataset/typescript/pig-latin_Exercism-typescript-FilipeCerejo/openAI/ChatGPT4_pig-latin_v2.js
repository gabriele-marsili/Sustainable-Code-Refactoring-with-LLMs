"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(word) {
    const vowelRegex = /^[aeiou]/;
    const clusterRegex = /^(ch|qu|squ|th|thr|sch)/;
    return word
        .split(' ')
        .map((w) => {
        const lowerWord = w.toLowerCase();
        if (vowelRegex.test(lowerWord)) {
            return `${lowerWord}ay`;
        }
        const clusterMatch = lowerWord.match(clusterRegex);
        if (clusterMatch) {
            const cluster = clusterMatch[0];
            return `${lowerWord.slice(cluster.length)}${cluster}ay`;
        }
        return `${lowerWord.slice(1)}${lowerWord[0]}ay`;
    })
        .join(' ');
}
