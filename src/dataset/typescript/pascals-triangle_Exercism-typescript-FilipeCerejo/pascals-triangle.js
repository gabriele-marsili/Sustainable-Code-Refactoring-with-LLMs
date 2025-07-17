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
            this._rows.push(Array.from(Array(s + 1), (v, i) => (this._rows[s - 1][i - 1] || 0) + (this._rows[s - 1][i] || 0)));
        }
    }
}
exports.Triangle = Triangle;
