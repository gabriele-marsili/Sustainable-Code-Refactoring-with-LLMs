export class Triangle {
    private _rows: number[][];

    public get rows(): number[][] {
        return this._rows;
    }

    public get lastRow(): number[] {
        return this._rows[this._rows.length - 1];
    }

    constructor(size: number) {
        this._rows = new Array(size);
        this._rows[0] = [1];
        this.buildTriangle(size);
    }

    private buildTriangle(size: number): void {
        for (let s = 1; s < size; s++) {
            const prevRow = this._rows[s - 1];
            const currentRow = new Array(s + 1);
            
            currentRow[0] = 1;
            currentRow[s] = 1;
            
            for (let i = 1; i < s; i++) {
                currentRow[i] = prevRow[i - 1] + prevRow[i];
            }
            
            this._rows[s] = currentRow;
        }
    }
}