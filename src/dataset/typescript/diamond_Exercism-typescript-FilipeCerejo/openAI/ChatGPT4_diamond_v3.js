"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond = new Array(size);
    for (let i = 0; i <= letterIdx; i++) {
        const line = new Array(size).fill(' ');
        line[letterIdx - i] = ALPHABET[i];
        line[letterIdx + i] = ALPHABET[i];
        const lineStr = line.join('');
        diamond[letterIdx - i] = lineStr;
        diamond[letterIdx + i] = lineStr;
    }
    return diamond.join('\n') + '\n';
}
