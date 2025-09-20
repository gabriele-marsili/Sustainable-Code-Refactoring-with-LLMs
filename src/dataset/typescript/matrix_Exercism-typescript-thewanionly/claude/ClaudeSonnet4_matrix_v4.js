"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        var _a;
        this.matrixRows = [];
        this.matrixColumns = [];
        const rows = matrix.split('\n');
        const numCols = ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.split(' ').length) || 0;
        this.matrixRows = new Array(rows.length);
        this.matrixColumns = new Array(numCols);
        for (let i = 0; i < numCols; i++) {
            this.matrixColumns[i] = new Array(rows.length);
        }
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const values = rows[rowIndex].split(' ');
            const rowArray = new Array(values.length);
            for (let colIndex = 0; colIndex < values.length; colIndex++) {
                const value = Number(values[colIndex]);
                rowArray[colIndex] = value;
                this.matrixColumns[colIndex][rowIndex] = value;
            }
            this.matrixRows[rowIndex] = rowArray;
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
