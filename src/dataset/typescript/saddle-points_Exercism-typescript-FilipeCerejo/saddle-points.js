"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saddlePoints = saddlePoints;
function saddlePoints(matrix) {
    let saddlePoints = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[row].length; column++) {
            let saddle = true;
            for (let innerRow = 0; innerRow < matrix.length; innerRow++) {
                if (matrix[row][column] > matrix[innerRow][column]) {
                    saddle = false;
                }
            }
            for (let innerCol = 0; innerCol < matrix[row].length; innerCol++) {
                if (matrix[row][column] < matrix[row][innerCol]) {
                    saddle = false;
                }
            }
            if (saddle) {
                // + 1 due to 1-indexed arrays
                saddlePoints.push({ row: row + 1, column: column + 1 });
            }
        }
    }
    return saddlePoints;
}
