"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let count = 0;
    board.forEach((line, row) => {
        let dots = getAllPlus(line, row);
        let pairs = dotLinePairs(dots);
        pairs.forEach((pair) => {
            count += verticalCheck(pair, row, board);
        });
    });
    return count;
}
function verticalCheck(pair, row, board) {
    let count = 0;
    let countable = true;
    let y0 = pair[0][1];
    let y1 = pair[1][1];
    for (let c = row + 1; c < board.length; c++) {
        if (countable && board[c][y0] === '+' && board[c][y1] === '+') {
            count++;
        }
        else if ((board[c][y0] !== '|' && board[c][y0] !== '+') || (board[c][y1] !== '|' && board[c][y1] !== '+')) {
            countable = false;
        }
    }
    return count;
}
function dotLinePairs(dots) {
    let dotPairs = [];
    dots.forEach((dot, idx, arr) => {
        arr.slice(idx + 1).forEach((nextDot) => {
            dotPairs.push([dot, nextDot]);
        });
    });
    return dotPairs;
}
function getAllPlus(line, row) {
    let dots = [];
    for (let c = 0; c < line.length; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}
