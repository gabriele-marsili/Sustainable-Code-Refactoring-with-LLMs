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
        this.matrixColumns = new Array(numCols).fill(null).map(() => new Array(rows.length));
        for (let i = 0; i < rows.length; i++) {
            const rowArray = rows[i].split(' ').map(Number);
            this.matrixRows[i] = rowArray;
            for (let j = 0; j < rowArray.length; j++) {
                this.matrixColumns[j][i] = rowArray[j];
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
