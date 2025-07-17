"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    return uncoded.split('').reduce((acc, cur, idx, arr) => {
        if (acc.letter[0] !== cur) {
            acc.result += acc.letter ? `${acc.letter.length > 1 ? acc.letter.length : ''}${acc.letter[0]}` : '';
            acc.letter = cur;
        }
        else {
            acc.letter += cur;
        }
        if (idx === arr.length - 1) {
            acc.result += acc.letter ? `${acc.letter.length > 1 ? acc.letter.length : ''}${acc.letter[0]}` : '';
        }
        return acc;
    }, { result: '', letter: '' }).result;
}
function decode(coded) {
    return coded.split('').reduce((acc, cur, idx) => {
        if (Number.isNaN(parseInt(cur))) {
            // console.log(acc.lastIdx, idx, Number(coded.substring(acc.lastIdx, idx)));
            acc.result += cur.repeat(Number(coded.substring(acc.lastIdx, idx))) || cur;
            acc.lastIdx = idx + 1;
        }
        return acc;
    }, { result: '', lastIdx: 0 }).result;
}
