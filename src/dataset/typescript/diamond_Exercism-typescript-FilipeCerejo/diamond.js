"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDiamond = makeDiamond;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function makeDiamond(character) {
    let letterIdx = ALPHABET.indexOf(character);
    let size = letterIdx * 2 + 1;
    let diamond = [];
    for (let i = letterIdx; i >= 0; i--) {
        let line = Array.from(Array(size), (v, k) => {
            if (k === letterIdx - i || k === letterIdx + i)
                return ALPHABET[i];
            return ' ';
        }).join('');
        diamond.push(line);
        if (i < letterIdx)
            diamond.unshift(line);
    }
    return diamond.join('\n') + '\n';
}
