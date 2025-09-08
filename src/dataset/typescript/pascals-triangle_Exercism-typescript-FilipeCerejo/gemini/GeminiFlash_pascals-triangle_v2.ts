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
        for (let s = 1; s < size; s++) {
            const newRow: number[] = new Array(s + 1);
            const previousRow = this._rows[s - 1];

            for (let i = 0; i <= s; i++) {
                const left = previousRow[i - 1] || 0;
                const right = previousRow[i] || 0;
                newRow[i] = left + right;
            }

            this._rows.push(newRow);
        }
    }
}