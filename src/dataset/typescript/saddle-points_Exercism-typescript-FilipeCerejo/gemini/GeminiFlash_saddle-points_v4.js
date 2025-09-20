"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saddlePoints = saddlePoints;
function saddlePoints(matrix) {
    const saddlePoints = [];
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return saddlePoints;
    }
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const currentValue = matrix[row][col];
            let isSaddlePoint = true;
            // Check if it's the maximum in its row
            for (let k = 0; k < numCols; k++) {
                if (matrix[row][k] > currentValue) {
                    isSaddlePoint = false;
                    break;
                }
            }
            if (!isSaddlePoint)
                continue;
            // Check if it's the minimum in its column
            for (let k = 0; k < numRows; k++) {
                if (matrix[k][col] < currentValue) {
                    isSaddlePoint = false;
                    break;
                }
            }
            if (isSaddlePoint) {
                saddlePoints.push({ row: row + 1, column: col + 1 });
            }
        }
    }
    return saddlePoints;
}
