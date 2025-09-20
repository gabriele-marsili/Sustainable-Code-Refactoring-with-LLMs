"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        const numRows = rows.length;
        const numCols = rows[0].length;
        const maxOfRows = rows.map((row) => Math.max(...row));
        const minOfCols = Array(numCols).fill(Infinity);
        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                if (rows[rowIndex][colIndex] < minOfCols[colIndex]) {
                    minOfCols[colIndex] = rows[rowIndex][colIndex];
                }
            }
        }
        const result = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                const el = rows[rowIndex][colIndex];
                if (el === maxOfRows[rowIndex] && el === minOfCols[colIndex]) {
                    result.push({ row: rowIndex, column: colIndex });
                }
            }
        }
        return result;
    }
}
exports.default = SaddlePoints;
