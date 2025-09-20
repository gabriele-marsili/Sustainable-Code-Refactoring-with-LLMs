"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const mineCell = '*';
        const rows = board.length;
        const result = new Array(rows);
        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            const row = board[rowIdx];
            const cols = row.length;
            const resultRow = new Array(cols);
            for (let colIdx = 0; colIdx < cols; colIdx++) {
                const cell = row[colIdx];
                if (cell === mineCell) {
                    resultRow[colIdx] = cell;
                    continue;
                }
                let cellValue = 0;
                const minRow = Math.max(0, rowIdx - 1);
                const maxRow = Math.min(rows - 1, rowIdx + 1);
                const minCol = Math.max(0, colIdx - 1);
                const maxCol = Math.min(cols - 1, colIdx + 1);
                for (let r = minRow; r <= maxRow; r++) {
                    const boardRow = board[r];
                    for (let c = minCol; c <= maxCol; c++) {
                        if (boardRow[c] === mineCell) {
                            cellValue++;
                        }
                    }
                }
                resultRow[colIdx] = cellValue === 0 ? ' ' : cellValue.toString();
            }
            result[rowIdx] = resultRow.join('');
        }
        return result;
    }
}
exports.default = Minesweeper;
