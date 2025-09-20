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
function isValid(p, rows, cols) {
    return p[0] >= 0 && p[0] < rows && p[1] >= 0 && p[1] < cols;
}
function isMine(p, field) {
    return field[p[0]][p[1]] === '*';
}
function annotate(field) {
    const rows = field.length;
    const cols = rows > 0 ? field[0].length : 0;
    const result = field.slice();
    for (let row = 0; row < rows; row++) {
        const currentRow = result[row].split('');
        for (let col = 0; col < cols; col++) {
            if (currentRow[col] === ' ') {
                let sum = 0;
                for (const [dx, dy] of ADJACENTS) {
                    const point = [row + dx, col + dy];
                    if (isValid(point, rows, cols) && isMine(point, field)) {
                        sum++;
                    }
                }
                if (sum > 0) {
                    currentRow[col] = String(sum);
                }
            }
        }
        result[row] = currentRow.join('');
    }
    return result;
}
