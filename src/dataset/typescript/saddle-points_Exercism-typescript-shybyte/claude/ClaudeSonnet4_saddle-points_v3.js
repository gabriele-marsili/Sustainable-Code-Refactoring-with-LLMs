"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        if (!rows.length || !rows[0].length)
            return [];
        const numRows = rows.length;
        const numCols = rows[0].length;
        const result = [];
        const rowMaxes = new Array(numRows);
        const colMins = new Array(numCols).fill(Infinity);
        for (let i = 0; i < numRows; i++) {
            let rowMax = -Infinity;
            for (let j = 0; j < numCols; j++) {
                const value = rows[i][j];
                if (value > rowMax)
                    rowMax = value;
                if (value < colMins[j])
                    colMins[j] = value;
            }
            rowMaxes[i] = rowMax;
        }
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const value = rows[i][j];
                if (value === rowMaxes[i] && value === colMins[j]) {
                    result.push({
                        row: i,
                        column: j
                    });
                }
            }
        }
        return result;
    }
}
exports.default = SaddlePoints;
