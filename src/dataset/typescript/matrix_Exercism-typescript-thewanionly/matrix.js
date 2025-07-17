"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        this.matrixRows = [];
        this.matrixColumns = [];
        matrix.split('\n').forEach((row) => {
            const rowArray = row.split(' ').map((val) => Number(val));
            //set rows
            this.matrixRows.push(rowArray);
            //set columns
            rowArray.forEach((value, colIndex) => {
                this.matrixColumns[colIndex]
                    ? this.matrixColumns[colIndex].push(value)
                    : (this.matrixColumns[colIndex] = [value]);
            });
        });
    }
    get rows() {
        return this.matrixRows;
    }
    get columns() {
        return this.matrixColumns;
    }
}
exports.Matrix = Matrix;
