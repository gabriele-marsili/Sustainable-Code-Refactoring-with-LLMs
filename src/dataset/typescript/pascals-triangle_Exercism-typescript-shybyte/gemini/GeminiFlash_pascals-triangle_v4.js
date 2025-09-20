"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangle {
    constructor(size) {
        this.rows = this.generateTriangle(size);
    }
    generateTriangle(size) {
        const rows = [];
        if (size > 0) {
            rows.push([1]);
            for (let i = 1; i < size; i++) {
                const lastRow = rows[i - 1];
                const newRow = new Array(i + 1);
                newRow[0] = 1;
                for (let j = 1; j < i; j++) {
                    newRow[j] = lastRow[j - 1] + lastRow[j];
                }
                newRow[i] = 1;
                rows.push(newRow);
            }
        }
        return rows;
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}
exports.default = Triangle;
