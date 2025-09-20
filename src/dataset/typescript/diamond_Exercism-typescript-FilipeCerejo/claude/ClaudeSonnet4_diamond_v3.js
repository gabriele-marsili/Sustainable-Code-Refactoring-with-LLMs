"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const result = [];
    for (let i = 0; i <= letterIdx; i++) {
        const spaces = letterIdx - i;
        const letter = ALPHABET[i];
        let line;
        if (i === 0) {
            line = ' '.repeat(spaces) + letter + ' '.repeat(spaces);
        }
        else {
            const innerSpaces = i * 2 - 1;
            line = ' '.repeat(spaces) + letter + ' '.repeat(innerSpaces) + letter + ' '.repeat(spaces);
        }
        result.push(line);
        if (i > 0) {
            result.unshift(line);
        }
    }
    return result.join('\n') + '\n';
}
