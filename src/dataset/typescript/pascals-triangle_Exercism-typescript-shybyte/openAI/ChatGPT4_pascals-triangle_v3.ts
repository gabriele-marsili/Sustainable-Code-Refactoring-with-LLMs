export default class Triangle {
    readonly rows: number[][];

    constructor(size: number) {
        this.rows = Array(size);
        this.rows[0] = [1];
        for (let l = 1; l < size; l++) {
            const prevRow = this.rows[l - 1];
            const newRow = new Array(l + 1);
            newRow[0] = 1;
            for (let i = 1; i < l; i++) {
                newRow[i] = prevRow[i - 1] + prevRow[i];
            }
            newRow[l] = 1;
            this.rows[l] = newRow;
        }
    }

    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}