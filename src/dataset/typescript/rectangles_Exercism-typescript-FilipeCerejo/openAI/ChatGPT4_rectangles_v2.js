"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        const dotCount = dots.length;
        for (let i = 0; i < dotCount - 1; i++) {
            for (let j = i + 1; j < dotCount; j++) {
                totalCount += verticalCheck(dots[i], dots[j], row, board);
            }
        }
    }
    return totalCount;
}
function verticalCheck(dot1, dot2, row, board) {
    let count = 0;
    const y0 = dot1[1];
    const y1 = dot2[1];
    for (let c = row + 1; c < board.length; c++) {
        if (board[c][y0] === '+' && board[c][y1] === '+') {
            count++;
        }
        else if ((board[c][y0] !== '|' && board[c][y0] !== '+') || (board[c][y1] !== '|' && board[c][y1] !== '+')) {
            break;
        }
    }
    return count;
}
function getAllPlus(line, row) {
    const dots = [];
    for (let c = 0, len = line.length; c < len; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}
