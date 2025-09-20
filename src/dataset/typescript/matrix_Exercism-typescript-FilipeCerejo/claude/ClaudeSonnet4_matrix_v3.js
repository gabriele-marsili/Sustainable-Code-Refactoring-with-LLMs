"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(strMatrix) {
        var _a;
        const rowsStr = strMatrix.split('\n');
        const numRows = rowsStr.length;
        const numCols = ((_a = rowsStr[0]) === null || _a === void 0 ? void 0 : _a.split(' ').length) || 0;
        this.classRows = new Array(numRows);
        this.classColumns = new Array(numCols);
        for (let i = 0; i < numCols; i++) {
            this.classColumns[i] = new Array(numRows);
        }
        for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
            const row = rowsStr[rowIdx].split(' ');
            this.classRows[rowIdx] = new Array(row.length);
            for (let colIdx = 0; colIdx < row.length; colIdx++) {
                const value = Number(row[colIdx]);
                this.classRows[rowIdx][colIdx] = value;
                this.classColumns[colIdx][rowIdx] = value;
            }
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
