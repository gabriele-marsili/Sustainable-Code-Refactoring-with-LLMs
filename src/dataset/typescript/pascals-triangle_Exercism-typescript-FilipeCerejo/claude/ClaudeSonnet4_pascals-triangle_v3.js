"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    get rows() {
        return this._rows;
    }
    get lastRow() {
        return this._rows[this._rows.length - 1];
    }
    constructor(size) {
        this._rows = [[1]];
        this.buildTriangle(size);
    }
    buildTriangle(size) {
        if (size <= 1)
            return;
        this._rows.length = size;
        for (let s = 1; s < size; s++) {
            const prevRow = this._rows[s - 1];
            const currentRow = new Array(s + 1);
            currentRow[0] = 1;
            currentRow[s] = 1;
            for (let i = 1; i < s; i++) {
                currentRow[i] = prevRow[i - 1] + prevRow[i];
            }
            this._rows[s] = currentRow;
        }
    }
}
exports.Triangle = Triangle;
