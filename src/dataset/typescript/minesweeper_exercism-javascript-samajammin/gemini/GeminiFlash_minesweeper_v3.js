"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const rows = board.length;
        if (rows === 0) {
            return [];
        }
        const cols = board[0].length;
        const mineCell = '*';
        const annotatedBoard = new Array(rows);
        for (let i = 0; i < rows; i++) {
            annotatedBoard[i] = '';
            for (let j = 0; j < cols; j++) {
                if (board[i][j] === mineCell) {
                    annotatedBoard[i] += mineCell;
                }
                else {
                    let mineCount = 0;
                    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
                        for (let colOffset = -1; colOffset <= 1; colOffset++) {
                            if (rowOffset === 0 && colOffset === 0) {
                                continue;
                            }
                            const newRow = i + rowOffset;
                            const newCol = j + colOffset;
                            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === mineCell) {
                                mineCount++;
                            }
                        }
                    }
                    annotatedBoard[i] += mineCount === 0 ? ' ' : mineCount.toString();
                }
            }
        }
        return annotatedBoard;
    }
}
exports.default = Minesweeper;
