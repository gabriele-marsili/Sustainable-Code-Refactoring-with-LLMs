"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        var _a;
        const mineCell = '*';
        const rows = board.length;
        const cols = ((_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        return board.map((row, rowIdx) => row.split('').map((cell, colIdx) => {
            if (cell === mineCell)
                return mineCell;
            let cellValue = 0;
            for (const [dr, dc] of directions) {
                const r = rowIdx + dr, c = colIdx + dc;
                if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === mineCell) {
                    cellValue++;
                }
            }
            return cellValue === 0 ? ' ' : cellValue.toString();
        }).join(''));
    }
}
exports.default = Minesweeper;
