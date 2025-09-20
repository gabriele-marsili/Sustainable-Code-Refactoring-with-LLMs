"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    var _a;
    const numRows = initialMtx.length;
    const numCols = maxRowLength(initialMtx);
    const transposeMtx = Array(numCols).fill('');
    for (let j = 0; j < numCols; j++) {
        let transposedRow = '';
        for (let i = 0; i < numRows; i++) {
            transposedRow += (_a = initialMtx[i][j]) !== null && _a !== void 0 ? _a : (areCharsAhead(i, j, initialMtx) ? ' ' : '');
        }
        transposeMtx[j] = transposedRow;
    }
    return transposeMtx;
}
function areCharsAhead(row, idx, initialMtx) {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][idx]) {
            return true;
        }
    }
    return false;
}
function maxRowLength(initialMtx) {
    let maxLength = 0;
    for (let i = 0; i < initialMtx.length; i++) {
        maxLength = Math.max(maxLength, initialMtx[i].length);
    }
    return maxLength;
}
