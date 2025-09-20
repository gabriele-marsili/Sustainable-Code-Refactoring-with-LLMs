"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(board) {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        if (dots.length > 1) {
            const pairs = dotLinePairs(dots);
            for (let i = 0; i < pairs.length; i++) {
                totalCount += verticalCheck(pairs[i], row, board);
            }
        }
    }
    return totalCount;
}
function verticalCheck(pair, row, board) {
    let count = 0;
    const y0 = pair[0][1];
    const y1 = pair[1][1];
    const boardLength = board.length;
    for (let c = row + 1; c < boardLength; c++) {
        const rowString = board[c];
        const char0 = rowString[y0];
        const char1 = rowString[y1];
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
    const dotsLength = dots.length;
    for (let i = 0; i < dotsLength - 1; i++) {
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
