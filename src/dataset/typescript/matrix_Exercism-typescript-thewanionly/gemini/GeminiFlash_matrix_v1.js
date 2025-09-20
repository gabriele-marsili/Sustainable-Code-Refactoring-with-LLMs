"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        this.matrixRows = [];
        this.matrixColumns = [];
        const rows = matrix.split('\n');
        const numRows = rows.length;
        if (numRows > 0) {
            const firstRow = rows[0].split(' ');
            const numCols = firstRow.length;
            this.matrixColumns = Array(numCols).fill(null).map(() => []);
            for (let i = 0; i < numRows; i++) {
                const row = rows[i].split(' ').map(Number);
                this.matrixRows.push(row);
                for (let j = 0; j < numCols; j++) {
                    this.matrixColumns[j].push(row[j]);
                }
            }
        }
    }
    get rows() {
        return this.matrixRows;
    }
    get columns() {
        return this.matrixColumns;
    }
}
exports.Matrix = Matrix;
