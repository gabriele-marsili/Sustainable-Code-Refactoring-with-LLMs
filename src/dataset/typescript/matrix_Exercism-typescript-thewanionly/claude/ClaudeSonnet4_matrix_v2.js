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
            const rowArray = rows[i].split(' ').map(Number);
            this.matrixRows.push(rowArray);
            // Direct assignment instead of conditional check
            for (let j = 0; j < rowArray.length; j++) {
                this.matrixColumns[j].push(rowArray[j]);
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
