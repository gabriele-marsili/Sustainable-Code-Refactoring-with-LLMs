"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        var _a;
        const mineCell = '*';
        const rows = board.length;
        const cols = ((_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        return board.map((row, rowIdx) => row
            .split('')
            .map((cell, colIdx) => {
            if (cell === mineCell)
                return mineCell;
            let cellValue = 0;
            for (let r of [rowIdx - 1, rowIdx, rowIdx + 1]) {
                if (r < 0 || r >= rows)
                    continue;
                for (let c of [colIdx - 1, colIdx, colIdx + 1]) {
                    if (c < 0 || c >= cols || (r === rowIdx && c === colIdx))
                        continue;
                    if (board[r][c] === mineCell)
                        cellValue++;
                }
            }
            return cellValue === 0 ? ' ' : cellValue.toString();
        })
            .join(''));
    }
}
exports.default = Minesweeper;
