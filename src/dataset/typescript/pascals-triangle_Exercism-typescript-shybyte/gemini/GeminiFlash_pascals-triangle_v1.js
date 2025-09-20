"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangle {
    constructor(size) {
        this.rows = this.generateRows(size);
    }
    generateRows(size) {
        if (size <= 0) {
            return [];
        }
        const rows = [[1]];
        for (let i = 1; i < size; i++) {
            const prevRow = rows[i - 1];
            const newRow = new Array(i + 1);
            newRow[0] = 1;
            for (let j = 1; j < i; j++) {
                newRow[j] = prevRow[j - 1] + prevRow[j];
            }
            newRow[i] = 1;
            rows.push(newRow);
        }
        return rows;
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}
exports.default = Triangle;
