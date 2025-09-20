"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saddlePoints = saddlePoints;
function saddlePoints(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }
    const rows = matrix.length;
    const cols = matrix[0].length;
    const saddlePoints = [];
    // Pre-compute row maximums and column minimums
    const rowMaxs = new Array(rows);
    const colMins = new Array(cols);
    // Find maximum in each row
    for (let row = 0; row < rows; row++) {
        let max = matrix[row][0];
        for (let col = 1; col < cols; col++) {
            if (matrix[row][col] > max) {
                max = matrix[row][col];
            }
        }
        rowMaxs[row] = max;
    }
    // Find minimum in each column
    for (let col = 0; col < cols; col++) {
        let min = matrix[0][col];
        for (let row = 1; row < rows; row++) {
            if (matrix[row][col] < min) {
                min = matrix[row][col];
            }
        }
        colMins[col] = min;
    }
    // Check for saddle points
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const value = matrix[row][col];
            if (value === rowMaxs[row] && value === colMins[col]) {
                saddlePoints.push({ row: row + 1, column: col + 1 });
            }
        }
    }
    return saddlePoints;
}
