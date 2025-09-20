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
    return !(p[0] < 0 || p[0] >= rows || p[1] < 0 || p[1] >= cols[p[0]]);
}
function isMine(p, field) {
    return field[p[0]][p[1]] === '*';
}
function annotate(field) {
    const rows = field.length;
    const cols = field.map(row => row.length);
    for (let row = 0; row < rows; row++) {
        let currentRow = field[row];
        let newRow = "";
        for (let col = 0; col < cols[row]; col++) {
            if (currentRow[col] === ' ') {
                let sum = 0;
                for (const adj of ADJACENTS) {
                    const point = [row + adj[0], col + adj[1]];
                    if (isValid(point, rows, cols) && isMine(point, field)) {
                        sum++;
                    }
                }
                newRow += sum > 0 ? String(sum) : ' ';
            }
            else {
                newRow += currentRow[col];
            }
        }
        field[row] = newRow;
    }
    return field;
}
