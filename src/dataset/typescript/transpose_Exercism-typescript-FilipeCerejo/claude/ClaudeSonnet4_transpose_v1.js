"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    if (initialMtx.length === 0)
        return [];
    const maxLength = maxRowLength(initialMtx);
    const transposeMtx = new Array(maxLength);
    for (let col = 0; col < maxLength; col++) {
        let column = '';
        for (let row = 0; row < initialMtx.length; row++) {
            const char = initialMtx[row][col];
            if (char !== undefined) {
                column += char;
            }
            else if (areCharsAhead(row, col, initialMtx)) {
                column += ' ';
            }
        }
        transposeMtx[col] = column;
    }
    return transposeMtx;
}
function areCharsAhead(row, idx, initialMtx) {
    for (let r = row + 1; r < initialMtx.length; r++) {
        if (initialMtx[r][idx]) {
            return true;
        }
    }
    return false;
}
function maxRowLength(initialMtx) {
    let maxLength = 0;
    for (let i = 0; i < initialMtx.length; i++) {
        if (initialMtx[i].length > maxLength) {
            maxLength = initialMtx[i].length;
        }
    }
    return maxLength;
}
