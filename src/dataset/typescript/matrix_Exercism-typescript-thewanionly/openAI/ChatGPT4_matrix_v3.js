"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        const rows = matrix.split('\n').map(row => row.split(' ').map(Number));
        this.matrixRows = rows;
        this.matrixColumns = rows[0].map((_, colIndex) => rows.map(row => row[colIndex]));
    }
    get rows() {
        return this.matrixRows;
    }
    get columns() {
        return this.matrixColumns;
    }
}
exports.Matrix = Matrix;
