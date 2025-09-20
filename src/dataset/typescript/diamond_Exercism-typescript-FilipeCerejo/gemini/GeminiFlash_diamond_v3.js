"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond = new Array(size);
    for (let i = 0; i <= letterIdx; i++) {
        const currentChar = ALPHABET[i];
        const padding = ' '.repeat(letterIdx - i);
        const middle = i > 0 ? currentChar + ' '.repeat(i * 2 - 1) + currentChar : currentChar;
        const line = padding + middle + padding;
        diamond[i] = line;
        diamond[size - 1 - i] = line;
    }
    return diamond.join('\n') + '\n';
}
