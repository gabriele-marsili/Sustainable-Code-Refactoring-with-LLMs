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
        this._rows = this.buildTriangle(size);
    }
    buildTriangle(size) {
        const rows = [[1]];
        for (let s = 1; s < size; s++) {
            const prevRow = rows[s - 1];
            const newRow = new Array(s + 1);
            newRow[0] = 1;
            for (let i = 1; i < s; i++) {
                newRow[i] = prevRow[i - 1] + prevRow[i];
            }
            newRow[s] = 1;
            rows.push(newRow);
        }
        return rows;
    }
}
exports.Triangle = Triangle;
