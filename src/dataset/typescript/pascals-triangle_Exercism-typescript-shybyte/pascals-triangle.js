"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangle {
    constructor(size) {
        const rows = [[1]];
        for (let l = 2; l <= size; l++) {
            const lastRow = rows[rows.length - 1];
            rows.push(Array.from({ length: l }, (_, i) => (lastRow[i - 1] || 0) + (lastRow[i] || 0)));
        }
        this.rows = rows;
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}
exports.default = Triangle;
