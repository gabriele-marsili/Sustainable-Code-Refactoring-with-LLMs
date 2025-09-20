"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function count3x3Window(board, centerX, centerY) {
    let sum = 0;
    const height = board.length;
    const width = height > 0 ? board[0].length : 0;
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const y = centerY + deltaY;
        if (y >= 0 && y < height) {
            const row = board[y];
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                const x = centerX + deltaX;
                if (x >= 0 && x < width && row[x] === '*') {
                    sum++;
                }
            }
        }
    }
    return sum;
}
class Minesweeper {
    annotate(board) {
        const height = board.length;
        if (height === 0)
            return [];
        const width = board[0].length;
        const annotatedBoard = new Array(height);
        for (let centerY = 0; centerY < height; centerY++) {
            let annotatedRow = "";
            for (let centerX = 0; centerX < width; centerX++) {
                const cell = board[centerY][centerX];
                if (cell === ' ') {
                    const count = count3x3Window(board, centerX, centerY);
                    annotatedRow += (count || ' ');
                }
                else {
                    annotatedRow += cell;
                }
            }
            annotatedBoard[centerY] = annotatedRow;
        }
        return annotatedBoard;
    }
}
exports.default = Minesweeper;
