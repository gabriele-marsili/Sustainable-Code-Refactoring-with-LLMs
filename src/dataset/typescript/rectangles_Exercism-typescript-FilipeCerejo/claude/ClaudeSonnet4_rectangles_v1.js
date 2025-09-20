"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let count = 0;
    const boardLength = board.length;
    for (let row = 0; row < boardLength; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        const dotsLength = dots.length;
        // Generate pairs inline to avoid array allocation
        for (let i = 0; i < dotsLength; i++) {
            for (let j = i + 1; j < dotsLength; j++) {
                count += verticalCheck([dots[i], dots[j]], row, board);
            }
        }
    }
    return count;
}
function verticalCheck(pair, row, board) {
    let count = 0;
    let countable = true;
    const y0 = pair[0][1];
    const y1 = pair[1][1];
    const boardLength = board.length;
    for (let c = row + 1; c < boardLength && countable; c++) {
        const char0 = board[c][y0];
        const char1 = board[c][y1];
        if (char0 === '+' && char1 === '+') {
            count++;
        }
        else if ((char0 !== '|' && char0 !== '+') || (char1 !== '|' && char1 !== '+')) {
            countable = false;
        }
    }
    return count;
}
function dotLinePairs(dots) {
    const dotPairs = [];
    const dotsLength = dots.length;
    for (let i = 0; i < dotsLength; i++) {
        for (let j = i + 1; j < dotsLength; j++) {
            dotPairs.push([dots[i], dots[j]]);
        }
    }
    return dotPairs;
}
function getAllPlus(line, row) {
    const dots = [];
    const lineLength = line.length;
    for (let c = 0; c < lineLength; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}
