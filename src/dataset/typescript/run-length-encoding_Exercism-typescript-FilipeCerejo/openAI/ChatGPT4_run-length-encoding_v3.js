"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
function encode(uncoded) {
    let { result, count, prevChar } = uncoded.split('').reduce((acc, cur) => {
        if (cur === acc.prevChar) {
            acc.count++;
        }
        else {
            if (acc.prevChar) {
                acc.result += (acc.count > 1 ? acc.count : '') + acc.prevChar;
            }
            acc.prevChar = cur;
            acc.count = 1;
        }
        return acc;
    }, { result: '', count: 0, prevChar: '' });
    if (prevChar) {
        result += (count > 1 ? count : '') + prevChar;
    }
    return result;
}
function decode(coded) {
    return coded.split('').reduce((acc, cur) => {
        if (!isNaN(Number(cur))) {
            acc.countBuffer += cur;
        }
        else {
            const count = acc.countBuffer ? parseInt(acc.countBuffer) : 1;
            acc.result += cur.repeat(count);
            acc.countBuffer = '';
        }
        return acc;
    }, { result: '', countBuffer: '' }).result;
}
