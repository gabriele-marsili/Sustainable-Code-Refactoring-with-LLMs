"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond = [];
    for (let i = letterIdx; i >= 0; i--) {
        const outerSpaces = letterIdx - i;
        const innerSpaces = i === 0 ? 0 : (i - 1) * 2 + 1;
        let line = ' '.repeat(outerSpaces);
        line += ALPHABET[i];
        if (i > 0) {
            line += ' '.repeat(innerSpaces);
            line += ALPHABET[i];
        }
        line += ' '.repeat(outerSpaces);
        diamond.push(line);
        if (i < letterIdx)
            diamond.unshift(line);
    }
    return diamond.join('\n') + '\n';
}
