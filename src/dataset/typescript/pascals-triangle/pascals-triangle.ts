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
            this._rows.push(
                Array.from(
                    Array(s + 1),
                    (v: unknown, i: number) => (this._rows[s - 1][i - 1] || 0) + (this._rows[s - 1][i] || 0)
                )
            );
        }
    }
}