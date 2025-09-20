"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    var _a;
    const maxLen = maxRowLength(initialMtx);
    const transposeMtx = Array(maxLen).fill('');
    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            const char = (_a = initialMtx[row][col]) !== null && _a !== void 0 ? _a : (col < initialMtx[row].length || areCharsAhead(row, col, initialMtx) ? ' ' : '');
            transposeMtx[col] += char;
        }
    }
    return transposeMtx;
}
function areCharsAhead(row, idx, initialMtx) {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][idx])
            return true;
    }
    return false;
}
function maxRowLength(initialMtx) {
    return Math.max(0, ...initialMtx.map(row => row.length));
}
