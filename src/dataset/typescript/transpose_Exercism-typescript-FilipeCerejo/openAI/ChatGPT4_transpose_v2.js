"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    var _a;
    const maxLen = Math.max(...initialMtx.map(row => row.length));
    const transposeMtx = Array(maxLen).fill('');
    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            transposeMtx[col] += (_a = initialMtx[row][col]) !== null && _a !== void 0 ? _a : (col < initialMtx[row].length ? ' ' : '');
        }
    }
    return transposeMtx;
}
