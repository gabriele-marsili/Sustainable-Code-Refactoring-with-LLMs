"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const dots = getAllPlus(board[row], row);
        const pairs = dotLinePairs(dots);
        for (const pair of pairs) {
            totalCount += verticalCheck(pair, row, board);
        }
    }
    return totalCount;
}
function verticalCheck(pair, row, board) {
    let count = 0;
    const [y0, y1] = [pair[0][1], pair[1][1]];
    for (let c = row + 1; c < board.length; c++) {
        const char0 = board[c][y0];
        const char1 = board[c][y1];
        if (char0 === '+' && char1 === '+') {
            count++;
        }
        else if ((char0 !== '|' && char0 !== '+') || (char1 !== '|' && char1 !== '+')) {
            break;
        }
    }
    return count;
}
function dotLinePairs(dots) {
    const dotPairs = [];
    const len = dots.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            dotPairs.push([dots[i], dots[j]]);
        }
    }
    return dotPairs;
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
