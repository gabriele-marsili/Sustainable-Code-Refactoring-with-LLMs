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
        for (let s = 1; s < size; s++) {
            const newRow = new Array(s + 1);
            const previousRow = this._rows[s - 1];
            newRow[0] = previousRow[0];
            for (let i = 1; i < s; i++) {
                newRow[i] = previousRow[i - 1] + previousRow[i];
            }
            newRow[s] = previousRow[s - 1];
            this._rows.push(newRow);
        }
    }
}
exports.Triangle = Triangle;
