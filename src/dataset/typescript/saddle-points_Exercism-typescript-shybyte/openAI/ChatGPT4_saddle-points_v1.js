"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        const result = [];
        const minOfCols = Array(rows[0].length).fill(Infinity);
        const maxOfRows = rows.map(row => Math.max(...row));
        rows.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el < minOfCols[colIndex]) {
                    minOfCols[colIndex] = el;
                }
            });
        });
        rows.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el === maxOfRows[rowIndex] && el === minOfCols[colIndex]) {
                    result.push({ row: rowIndex, column: colIndex });
                }
            });
        });
        return result;
    }
}
exports.default = SaddlePoints;
