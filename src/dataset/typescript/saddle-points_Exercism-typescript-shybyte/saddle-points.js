"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        const cols = rows[0].map((_, colIndex) => rows.map((row) => row[colIndex]));
        const result = [];
        const minOfCols = cols.map((col) => Math.min(...col));
        rows.forEach((row, rowIndex) => {
            const maxOfRow = Math.max(...row);
            row.forEach((el, colIndex) => {
                if (el >= maxOfRow && el <= minOfCols[colIndex]) {
                    result.push({
                        row: rowIndex,
                        column: colIndex
                    });
                }
            });
        });
        return result;
    }
}
exports.default = SaddlePoints;
