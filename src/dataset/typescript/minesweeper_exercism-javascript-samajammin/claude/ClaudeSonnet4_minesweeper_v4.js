"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const boardHeight = board.length;
        if (boardHeight === 0)
            return [];
        const boardWidth = board[0].length;
        const result = new Array(boardHeight);
        for (let rowIdx = 0; rowIdx < boardHeight; rowIdx++) {
            const row = board[rowIdx];
            let resultRow = '';
            for (let colIdx = 0; colIdx < boardWidth; colIdx++) {
                const cell = row[colIdx];
                if (cell === '*') {
                    resultRow += '*';
                    continue;
                }
                let cellValue = 0;
                const minRow = Math.max(0, rowIdx - 1);
                const maxRow = Math.min(boardHeight - 1, rowIdx + 1);
                const minCol = Math.max(0, colIdx - 1);
                const maxCol = Math.min(boardWidth - 1, colIdx + 1);
                for (let r = minRow; r <= maxRow; r++) {
                    const currentRow = board[r];
                    for (let c = minCol; c <= maxCol; c++) {
                        if (currentRow[c] === '*') {
                            cellValue++;
                        }
                    }
                }
                resultRow += cellValue === 0 ? ' ' : cellValue.toString();
            }
            result[rowIdx] = resultRow;
        }
        return result;
    }
}
exports.default = Minesweeper;
