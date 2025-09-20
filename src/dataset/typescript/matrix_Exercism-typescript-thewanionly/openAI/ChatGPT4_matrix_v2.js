"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        this.matrixRows = matrix.split('\n').map(row => row.split(' ').map(Number));
        this.matrixColumns = this.matrixRows[0].map((_, colIndex) => this.matrixRows.map(row => row[colIndex]));
    }
    get rows() {
        return this.matrixRows;
    }
    get columns() {
        return this.matrixColumns;
    }
}
exports.Matrix = Matrix;
