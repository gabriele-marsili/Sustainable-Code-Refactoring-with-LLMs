"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond = [];
    for (let i = 0; i <= letterIdx; i++) {
        const outerSpaces = ' '.repeat(letterIdx - i);
        const innerSpaces = i === 0 ? '' : ' '.repeat(i * 2 - 1);
        const letter = ALPHABET[i];
        const line = outerSpaces + letter + innerSpaces + (i === 0 ? '' : letter) + outerSpaces;
        diamond.push(line);
        if (i > 0)
            diamond.unshift(line);
    }
    return diamond.join('\n') + '\n';
}
