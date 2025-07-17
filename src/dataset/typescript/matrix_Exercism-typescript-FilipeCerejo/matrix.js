"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(strMatrix) {
        let rowsStr = strMatrix.split('\n');
        this.classRows = [];
        this.classColumns = [];
        rowsStr.forEach(rs => {
            this.classRows.push(rs.split(' ').map(c => Number(c)));
        });
        this.classRows.forEach((row, row_idx) => {
            row.forEach((col, col_idx) => {
                let colum = this.classColumns[col_idx] ? this.classColumns[col_idx].slice() : [];
                colum.push(col);
                this.classColumns[col_idx] = colum;
            });
        });
    }
    get rows() {
        return this.classRows;
    }
    get columns() {
        return this.classColumns;
    }
}
exports.Matrix = Matrix;
