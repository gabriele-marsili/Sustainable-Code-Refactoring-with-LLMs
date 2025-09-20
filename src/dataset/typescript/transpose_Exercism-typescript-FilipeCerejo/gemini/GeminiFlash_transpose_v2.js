"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    const numRows = initialMtx.length;
    const numCols = maxRowLength(initialMtx);
    const transposeMtx = Array(numCols).fill('');
    for (let col = 0; col < numCols; col++) {
        let transposedRow = '';
        for (let row = 0; row < numRows; row++) {
            const char = initialMtx[row][col];
            if (char !== undefined) {
                transposedRow += char;
            }
            else if (areCharsAhead(row, col, initialMtx)) {
                transposedRow += ' ';
            }
            else {
                transposedRow += '';
            }
        }
        transposeMtx[col] = transposedRow;
    }
    return transposeMtx;
}
function areCharsAhead(row, col, initialMtx) {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][col]) {
            return true;
        }
    }
    return false;
}
function maxRowLength(initialMtx) {
    let maxLength = 0;
    for (let i = 0; i < initialMtx.length; i++) {
        const rowLength = initialMtx[i].length;
        if (rowLength > maxLength) {
            maxLength = rowLength;
        }
    }
    return maxLength;
}
