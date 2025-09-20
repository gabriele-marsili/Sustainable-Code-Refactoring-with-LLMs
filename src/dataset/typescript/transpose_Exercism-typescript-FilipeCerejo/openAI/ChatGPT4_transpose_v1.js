"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = transpose;
function transpose(initialMtx) {
    var _a;
    const maxLen = maxRowLength(initialMtx);
    const transposeMtx = Array(maxLen).fill('');
    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            transposeMtx[col] += (_a = initialMtx[row][col]) !== null && _a !== void 0 ? _a : (col < initialMtx[row].length || hasCharsBelow(row, col, initialMtx) ? ' ' : '');
        }
    }
    return transposeMtx;
}
// Check if there are characters below the current position
function hasCharsBelow(row, col, initialMtx) {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][col])
            return true;
    }
    return false;
}
// Get the length of the longest row
function maxRowLength(initialMtx) {
    return Math.max(0, ...initialMtx.map(row => row.length));
}
