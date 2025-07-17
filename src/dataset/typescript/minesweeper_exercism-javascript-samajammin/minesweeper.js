"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minesweeper {
    annotate(board) {
        const mineCell = '*';
        return board.map((row, rowIdx) => {
            return row
                .split('')
                .map((cell, colIdx) => {
                if (cell === mineCell) {
                    return cell;
                }
                let cellValue = 0;
                for (let r = rowIdx - 1; r <= rowIdx + 1; r++) {
                    for (let c = colIdx - 1; c <= colIdx + 1; c++) {
                        if (board[r] && board[r][c] === mineCell) {
                            cellValue++;
                        }
                    }
                }
                return cellValue === 0 ? ' ' : cellValue;
            })
                .join('');
        });
    }
}
exports.default = Minesweeper;
