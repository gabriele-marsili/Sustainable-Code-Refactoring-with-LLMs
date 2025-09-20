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
        // Pre-allocate columns array
        this.matrixColumns = Array.from({ length: numCols }, () => []);
        for (let i = 0; i < rows.length; i++) {
            const rowValues = rows[i].split(' ');
            const rowArray = new Array(rowValues.length);
            for (let j = 0; j < rowValues.length; j++) {
                const value = Number(rowValues[j]);
                rowArray[j] = value;
                this.matrixColumns[j].push(value);
            }
            this.matrixRows.push(rowArray);
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
