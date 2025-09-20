"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(strMatrix) {
        this.classRows = strMatrix.split('\n').map(row => row.split(' ').map(Number));
        this.classColumns = this.classRows[0].map((_, colIdx) => this.classRows.map(row => row[colIdx]));
    }
    get rows() {
        return this.classRows;
    }
    get columns() {
        return this.classColumns;
    }
}
exports.Matrix = Matrix;
