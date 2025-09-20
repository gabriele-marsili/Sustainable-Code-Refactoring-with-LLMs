"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saddlePoints = saddlePoints;
function saddlePoints(matrix) {
    const saddlePoints = [];
    const rowMaxes = matrix.map(row => Math.max(...row));
    const colMins = matrix[0].map((_, col) => Math.min(...matrix.map(row => row[col])));
    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[row].length; column++) {
            if (matrix[row][column] === rowMaxes[row] && matrix[row][column] === colMins[column]) {
                saddlePoints.push({ row: row + 1, column: column + 1 });
            }
        }
    }
    return saddlePoints;
}
