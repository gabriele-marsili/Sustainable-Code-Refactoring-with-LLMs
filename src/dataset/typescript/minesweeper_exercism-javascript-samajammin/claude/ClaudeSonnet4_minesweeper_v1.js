"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const mineCell = '*';
        const boardHeight = board.length;
        const result = new Array(boardHeight);
        for (let rowIdx = 0; rowIdx < boardHeight; rowIdx++) {
            const row = board[rowIdx];
            const rowLength = row.length;
            let newRow = '';
            for (let colIdx = 0; colIdx < rowLength; colIdx++) {
                const cell = row[colIdx];
                if (cell === mineCell) {
                    newRow += cell;
                    continue;
                }
                let cellValue = 0;
                const minRow = Math.max(0, rowIdx - 1);
                const maxRow = Math.min(boardHeight - 1, rowIdx + 1);
                const minCol = Math.max(0, colIdx - 1);
                const maxCol = Math.min(rowLength - 1, colIdx + 1);
                for (let r = minRow; r <= maxRow; r++) {
                    const currentRow = board[r];
                    for (let c = minCol; c <= maxCol; c++) {
                        if (currentRow[c] === mineCell) {
                            cellValue++;
                        }
                    }
                }
                newRow += cellValue === 0 ? ' ' : cellValue;
            }
            result[rowIdx] = newRow;
        }
        return result;
    }
}
exports.default = Minesweeper;
