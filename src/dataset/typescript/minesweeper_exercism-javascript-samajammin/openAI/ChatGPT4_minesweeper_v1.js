"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        var _a;
        const mineCell = '*';
        const rows = board.length;
        const cols = ((_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        return board.map((row, rowIdx) => row.replace(/./g, (cell, colIdx) => {
            if (cell === mineCell)
                return mineCell;
            let cellValue = 0;
            for (let r = Math.max(0, rowIdx - 1); r <= Math.min(rows - 1, rowIdx + 1); r++) {
                for (let c = Math.max(0, colIdx - 1); c <= Math.min(cols - 1, colIdx + 1); c++) {
                    if (board[r][c] === mineCell)
                        cellValue++;
                }
            }
            return cellValue === 0 ? ' ' : cellValue.toString();
        }));
    }
}
exports.default = Minesweeper;
