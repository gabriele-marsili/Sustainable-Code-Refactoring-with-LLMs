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
            const row = rows[i];
            for (let j = 0; j < numCols; j++) {
                const val = row[j];
                if (val > rowMax)
                    rowMax = val;
                if (val < colMins[j])
                    colMins[j] = val;
            }
            rowMaxes[i] = rowMax;
        }
        for (let i = 0; i < numRows; i++) {
            const row = rows[i];
            const rowMax = rowMaxes[i];
            for (let j = 0; j < numCols; j++) {
                const val = row[j];
                if (val === rowMax && val === colMins[j]) {
                    result.push({ row: i, column: j });
                }
            }
        }
        return result;
    }
}
exports.default = SaddlePoints;
