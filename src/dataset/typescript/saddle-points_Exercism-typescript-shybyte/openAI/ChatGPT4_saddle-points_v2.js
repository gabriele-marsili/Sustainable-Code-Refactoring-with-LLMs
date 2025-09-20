"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        const numRows = rows.length;
        const numCols = rows[0].length;
        const maxOfRows = rows.map((row) => Math.max(...row));
        const minOfCols = Array(numCols).fill(Infinity);
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                if (rows[row][col] < minOfCols[col]) {
                    minOfCols[col] = rows[row][col];
                }
            }
        }
        const result = [];
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const el = rows[row][col];
                if (el === maxOfRows[row] && el === minOfCols[col]) {
                    result.push({ row, column: col });
                }
            }
        }
        return result;
    }
}
exports.default = SaddlePoints;
