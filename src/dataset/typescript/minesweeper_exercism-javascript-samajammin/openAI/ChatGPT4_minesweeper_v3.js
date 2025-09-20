"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const mineCell = '*';
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        return board.map((row, rowIdx) => row.split('').map((cell, colIdx) => {
            if (cell === mineCell)
                return mineCell;
            const cellValue = directions.reduce((count, [dx, dy]) => {
                var _a;
                const r = rowIdx + dx, c = colIdx + dy;
                return count + (((_a = board[r]) === null || _a === void 0 ? void 0 : _a[c]) === mineCell ? 1 : 0);
            }, 0);
            return cellValue === 0 ? ' ' : cellValue.toString();
        }).join(''));
    }
}
exports.default = Minesweeper;
