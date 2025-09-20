"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangle {
    constructor(size) {
        this.rows = Array(size);
        this.rows[0] = [1];
        for (let l = 1; l < size; l++) {
            const lastRow = this.rows[l - 1];
            const newRow = new Array(l + 1);
            newRow[0] = 1;
            for (let i = 1; i < l; i++) {
                newRow[i] = lastRow[i - 1] + lastRow[i];
            }
            newRow[l] = 1;
            this.rows[l] = newRow;
        }
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}
exports.default = Triangle;
