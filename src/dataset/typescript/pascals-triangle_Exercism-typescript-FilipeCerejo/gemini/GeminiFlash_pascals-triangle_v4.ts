export class Triangle {
    private _rows: number[][] = [[1]];

    public get rows(): number[][] {
        return this._rows;
    }

    public get lastRow(): number[] {
        return this._rows[this._rows.length - 1];
    }

    constructor(size: number) {
        this.buildTriangle(size);
    }

    private buildTriangle(size: number): void {
        if (size <= 1) return;

        for (let s = 1; s < size; s++) {
            const newRow: number[] = new Array(s + 1);
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