"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond = new Array(size);
    for (let i = letterIdx; i >= 0; i--) {
        let line = '';
        const outerSpace = letterIdx - i;
        const innerSpace = i > 0 ? i * 2 - 1 : 0;
        line += ' '.repeat(outerSpace);
        line += ALPHABET[i];
        if (i > 0) {
            line += ' '.repeat(innerSpace);
            line += ALPHABET[i];
        }
        line += ' '.repeat(outerSpace);
        diamond[letterIdx - i] = line;
        diamond[letterIdx + i] = line;
    }
    return diamond.join('\n') + '\n';
}
