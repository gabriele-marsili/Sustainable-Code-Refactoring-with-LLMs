"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(strMatrix) {
        const rowsStr = strMatrix.split('\n');
        this.classRows = rowsStr.map(rs => rs.split(' ').map(Number));
        const numRows = this.classRows.length;
        if (numRows > 0) {
            const numCols = this.classRows[0].length;
            this.classColumns = Array(numCols).fill(null).map(() => Array());
            for (let colIdx = 0; colIdx < numCols; colIdx++) {
                for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
                    this.classColumns[colIdx].push(this.classRows[rowIdx][colIdx]);
                }
            }
        }
        else {
            this.classColumns = [];
        }
    }
    get rows() {
        return this.classRows;
    }
    get columns() {
        return this.classColumns;
    }
}
exports.Matrix = Matrix;
