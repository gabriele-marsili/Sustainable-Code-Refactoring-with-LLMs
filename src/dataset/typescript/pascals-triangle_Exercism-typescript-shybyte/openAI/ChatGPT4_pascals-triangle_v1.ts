export default class Triangle {
    readonly rows: number[][];

    constructor(size: number) {
        this.rows = [];
        for (let l = 0; l < size; l++) {
            const row = new Array(l + 1);
            row[0] = row[l] = 1;
            for (let i = 1; i < l; i++) {
                row[i] = this.rows[l - 1][i - 1] + this.rows[l - 1][i];
            }
            this.rows.push(row);
        }
    }

    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}