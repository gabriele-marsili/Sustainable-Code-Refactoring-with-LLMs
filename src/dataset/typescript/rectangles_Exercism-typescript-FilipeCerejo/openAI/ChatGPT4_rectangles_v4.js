"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const dots = getAllPlus(board[row], row);
        const dotCount = dots.length;
        if (dotCount < 2)
            continue;
        for (let i = 0; i < dotCount - 1; i++) {
            const y0 = dots[i][1];
            for (let j = i + 1; j < dotCount; j++) {
                const y1 = dots[j][1];
                totalCount += verticalCheck(y0, y1, row, board);
            }
        }
    }
    return totalCount;
}
function verticalCheck(y0, y1, row, board) {
    let count = 0;
    for (let c = row + 1; c < board.length; c++) {
        const cell0 = board[c][y0];
        const cell1 = board[c][y1];
        if (cell0 === '+' && cell1 === '+') {
            count++;
        }
        else if ((cell0 !== '|' && cell0 !== '+') || (cell1 !== '|' && cell1 !== '+')) {
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
