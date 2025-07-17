"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = proverb;
function proverb(...nouns) {
    return nouns.slice(0, -1)
        .map((nounI, i) => `For want of a ${nounI} the ${nouns[i + 1]} was lost.`)
        .concat(`And all for the want of a ${nouns[0]}.`)
        .join('\n');
}
