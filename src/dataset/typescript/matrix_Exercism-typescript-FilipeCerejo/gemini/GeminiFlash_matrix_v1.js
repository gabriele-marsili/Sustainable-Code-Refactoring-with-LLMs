"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
class Matrix {
    constructor(strMatrix) {
        const rowsStr = strMatrix.split('\n');
        this.rowsData = rowsStr.map(rs => rs.split(' ').map(Number));
        const numRows = this.rowsData.length;
        if (numRows === 0) {
            this.columnsData = [];
            return;
        }
        const numCols = this.rowsData[0].length;
        this.columnsData = Array(numCols).fill(null).map(() => Array(numRows));
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                this.columnsData[j][i] = this.rowsData[i][j];
            }
        }
    }
    get rows() {
        return this.rowsData.map(row => [...row]); // Defensive copy
    }
    get columns() {
        return this.columnsData.map(col => [...col]); // Defensive copy
    }
}
exports.Matrix = Matrix;
