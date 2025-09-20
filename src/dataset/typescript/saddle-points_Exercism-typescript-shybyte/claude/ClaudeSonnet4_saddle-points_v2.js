"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaddlePoints {
    static saddlePoints(rows) {
        if (rows.length === 0 || rows[0].length === 0) {
            return [];
        }
        const numRows = rows.length;
        const numCols = rows[0].length;
        const result = [];
        // Pre-compute row maximums
        const rowMaxes = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
            let max = rows[i][0];
            for (let j = 1; j < numCols; j++) {
                if (rows[i][j] > max) {
                    max = rows[i][j];
                }
            }
            rowMaxes[i] = max;
        }
        // Pre-compute column minimums
        const colMins = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            let min = rows[0][j];
            for (let i = 1; i < numRows; i++) {
                if (rows[i][j] < min) {
                    min = rows[i][j];
                }
            }
            colMins[j] = min;
        }
        // Find saddle points
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
