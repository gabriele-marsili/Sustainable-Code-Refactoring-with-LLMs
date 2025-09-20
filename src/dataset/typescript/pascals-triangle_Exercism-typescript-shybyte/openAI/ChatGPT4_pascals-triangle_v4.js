"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangle {
    constructor(size) {
        this.rows = Array(size).fill(null).map((_, l) => {
            const row = new Array(l + 1);
            row[0] = row[l] = 1;
            for (let i = 1; i < l; i++) {
                row[i] = this.rows[l - 1][i - 1] + this.rows[l - 1][i];
            }
            return row;
        });
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}
exports.default = Triangle;
