export class Triangle {
    private _rows: number[][];

    public get rows(): number[][] {
        return this._rows;
    }

    public get lastRow(): number[] {
        return this._rows[this._rows.length - 1];
    }

    constructor(size: number) {
        this._rows = this.buildTriangle(size);
    }

    private buildTriangle(size: number): number[][] {
        const rows: number[][] = [[1]];
        for (let s = 1; s < size; s++) {
            const prevRow = rows[s - 1];
            const newRow = new Array(s + 1);
            newRow[0] = 1;
            for (let i = 1; i < s; i++) {
                newRow[i] = prevRow[i - 1] + prevRow[i];
            }
            newRow[s] = 1;
            rows.push(newRow);
        }
        return rows;
    }
}