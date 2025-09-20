"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(matrix) {
        var _a;
        const rows = matrix.split('\n').map(row => row.split(' ').map(Number));
        const columns = ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.map((_, colIndex) => rows.map(row => row[colIndex]))) || [];
        this.matrixRows = rows;
        this.matrixColumns = columns;
    }
    get rows() {
        return this.matrixRows;
    }
    get columns() {
        return this.matrixColumns;
    }
}
exports.Matrix = Matrix;
