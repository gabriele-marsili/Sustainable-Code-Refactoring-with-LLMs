"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    const { result } = uncoded.split('').reduce((acc, cur) => {
        if (cur === acc.prevChar) {
            acc.count++;
        }
        else {
            if (acc.prevChar) {
                acc.result.push(acc.count > 1 ? `${acc.count}${acc.prevChar}` : acc.prevChar);
            }
            acc.prevChar = cur;
            acc.count = 1;
        }
        return acc;
    }, { result: [], count: 0, prevChar: '' });
    if (result.length === 0 || uncoded[uncoded.length - 1] === result[result.length - 1]) {
        result.push(result.length > 1 ? `${result.length}${uncoded}` : uncoded);
    }
    return result.join('');
}
function decode(coded) {
    const { result } = coded.split('').reduce((acc, cur) => {
        if (!isNaN(Number(cur))) {
            acc.countBuffer += cur;
        }
        else {
            const count = acc.countBuffer ? parseInt(acc.countBuffer) : 1;
            acc.result.push(cur.repeat(count));
            acc.countBuffer = '';
        }
        return acc;
    }, { result: [], countBuffer: '' });
    return result.join('');
}
