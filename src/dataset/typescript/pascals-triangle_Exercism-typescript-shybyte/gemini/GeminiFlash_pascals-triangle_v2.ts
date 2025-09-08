export default class Triangle {
    readonly rows: number[][]

    constructor(size: number) {
        this.rows = [];
        for (let i = 0; i < size; i++) {
            const row = new Array(i + 1);
            row[0] = 1;
            row[i] = 1;

            for (let j = 1; j < i; j++) {
                row[j] = this.rows[i - 1][j - 1] + this.rows[i - 1][j];
            }
            this.rows.push(row);
        }
    }

    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}