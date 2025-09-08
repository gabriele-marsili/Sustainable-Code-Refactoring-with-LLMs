export default class Triangle {
    readonly rows: number[][]

    constructor(size: number) {
        this.rows = this.generateTriangle(size);
    }

    private generateTriangle(size: number): number[][] {
        if (size <= 0) {
            return [];
        }

        const rows: number[][] = [[1]];

        for (let i = 1; i < size; i++) {
            const newRow: number[] = new Array(i + 1);
            newRow[0] = 1;
            newRow[i] = 1;

            const prevRow = rows[i - 1];

            for (let j = 1; j < i; j++) {
                newRow[j] = prevRow[j - 1] + prevRow[j];
            }

            rows.push(newRow);
        }

        return rows;
    }

    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
}