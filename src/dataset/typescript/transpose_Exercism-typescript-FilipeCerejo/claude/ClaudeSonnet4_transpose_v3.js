"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    if (initialMtx.length === 0)
        return [];
    const maxLength = Math.max(...initialMtx.map(row => row.length));
    const transposeMtx = new Array(maxLength);
    for (let col = 0; col < maxLength; col++) {
        let column = '';
        for (let row = 0; row < initialMtx.length; row++) {
            const char = initialMtx[row][col];
            if (char !== undefined) {
                column += char;
            }
            else if (hasCharAhead(row, col, initialMtx)) {
                column += ' ';
            }
        }
        transposeMtx[col] = column;
    }
    return transposeMtx;
}
function areCharsAhead(row, idx, initialMtx) {
    return hasCharAhead(row, idx, initialMtx);
}
function hasCharAhead(row, idx, initialMtx) {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][idx] !== undefined) {
            return true;
        }
    }
    return false;
}
function maxRowLength(initialMtx) {
    let max = 0;
    for (const row of initialMtx) {
        if (row.length > max) {
            max = row.length;
        }
    }
    return max;
}
