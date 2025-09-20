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
        for (let s = 1; s < size; s++) {
            const newRow = new Array(s + 1);
            const previousRow = this._rows[s - 1];
            for (let i = 0; i < s + 1; i++) {
                const left = previousRow[i - 1] || 0;
                const right = previousRow[i] || 0;
                newRow[i] = left + right;
            }
            this._rows.push(newRow);
        }
    }
}
exports.Triangle = Triangle;
