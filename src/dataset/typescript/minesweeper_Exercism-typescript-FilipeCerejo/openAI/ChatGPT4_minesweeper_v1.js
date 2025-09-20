"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = annotate;
const ADJACENTS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
function isValid(x, y, rows, cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}
function annotate(field) {
    const rows = field.length;
    const cols = rows > 0 ? field[0].length : 0;
    const result = field.map(row => row.split(''));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (field[row][col] === ' ') {
                let sum = 0;
                for (const [dx, dy] of ADJACENTS) {
                    const x = row + dx;
                    const y = col + dy;
                    if (isValid(x, y, rows, cols) && field[x][y] === '*') {
                        sum++;
                    }
                }
                if (sum > 0) {
                    result[row][col] = String(sum);
                }
            }
        }
    }
    return result.map(row => row.join(''));
}
