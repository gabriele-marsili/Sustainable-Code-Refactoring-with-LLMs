"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function count3x3Window(board, centerX, centerY) {
    let sum = 0;
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const row = board[centerY + deltaY];
        if (!row)
            continue;
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            if (row[centerX + deltaX] === '*')
                sum++;
        }
    }
    return sum;
}
class Minesweeper {
    annotate(board) {
        var _a;
        const height = board.length;
        const width = ((_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        return board.map((row, centerY) => {
            const resultRow = new Array(width);
            for (let centerX = 0; centerX < width; centerX++) {
                const cell = row[centerX];
                resultRow[centerX] = cell === ' '
                    ? (count3x3Window(board, centerX, centerY) || ' ')
                    : cell;
            }
            return resultRow.join('');
        });
    }
}
exports.default = Minesweeper;
