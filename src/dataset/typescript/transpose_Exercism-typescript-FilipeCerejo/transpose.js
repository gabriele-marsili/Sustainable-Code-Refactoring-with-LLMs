"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    let transposeMtx = Array.from(Array(maxRowLength(initialMtx)), () => '');
    for (let row = 0; row < initialMtx.length; row++) {
        transposeMtx = transposeMtx.map((c, idx) => {
            var _a;
            return c + ((_a = initialMtx[row][idx]) !== null && _a !== void 0 ? _a : (areCharsAhead(row, idx, initialMtx) ? ' ' : ''));
        });
    }
    return transposeMtx;
}
//calculate if there is the need of white space
function areCharsAhead(row, idx, initialMtx) {
    let charAhead = false;
    while (initialMtx[row + 1]) {
        if (initialMtx[row + 1][idx]) {
            charAhead = true;
            break;
        }
        row++;
    }
    return charAhead;
}
//build matrix considering the longest row
function maxRowLength(initialMtx) {
    return initialMtx.reduce((acc, cur) => {
        if (cur.length > acc)
            acc = cur.length;
        return acc;
    }, 0);
}
