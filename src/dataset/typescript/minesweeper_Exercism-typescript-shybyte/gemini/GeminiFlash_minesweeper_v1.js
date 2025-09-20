"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countAdjacentMines(board, centerX, centerY) {
    var _a;
    let count = 0;
    const rows = board.length;
    const cols = ((_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    for (let i = Math.max(0, centerY - 1); i <= Math.min(centerY + 1, rows - 1); i++) {
        for (let j = Math.max(0, centerX - 1); j <= Math.min(centerX + 1, cols - 1); j++) {
            if (i === centerY && j === centerX)
                continue;
            if (board[i][j] === '*') {
                count++;
            }
        }
    }
    return count;
}
class Minesweeper {
    annotate(board) {
        const rows = board.length;
        if (rows === 0)
            return [];
        const cols = board[0].length;
        const annotatedBoard = new Array(rows);
        for (let i = 0; i < rows; i++) {
            annotatedBoard[i] = "";
            for (let j = 0; j < cols; j++) {
                if (board[i][j] === '*') {
                    annotatedBoard[i] += '*';
                }
                else {
                    const adjacentMines = countAdjacentMines(board, j, i);
                    annotatedBoard[i] += adjacentMines > 0 ? adjacentMines.toString() : ' ';
                }
            }
        }
        return annotatedBoard;
    }
}
exports.default = Minesweeper;
