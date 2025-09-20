"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        const result = [];
        const minOfCols = Array(rows[0].length).fill(Infinity);
        for (let colIndex = 0; colIndex < rows[0].length; colIndex++) {
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                if (rows[rowIndex][colIndex] < minOfCols[colIndex]) {
                    minOfCols[colIndex] = rows[rowIndex][colIndex];
                }
            }
        }
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            const maxOfRow = Math.max(...row);
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                if (row[colIndex] === maxOfRow && row[colIndex] === minOfCols[colIndex]) {
                    result.push({ row: rowIndex, column: colIndex });
                }
            }
        }
        return result;
    }
}
exports.default = SaddlePoints;
