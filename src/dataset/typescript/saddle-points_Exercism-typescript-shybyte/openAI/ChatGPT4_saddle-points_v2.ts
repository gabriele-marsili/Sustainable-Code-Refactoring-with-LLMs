type Matrix = number[][];

interface MatrixPosition {
    row: number;
    column: number;
}

export default class SaddlePoints {
    static saddlePoints(rows: Matrix): MatrixPosition[] {
        const numRows = rows.length;
        const numCols = rows[0].length;

        const maxOfRows = rows.map((row) => Math.max(...row));
        const minOfCols = Array(numCols).fill(Infinity);

        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                if (rows[row][col] < minOfCols[col]) {
                    minOfCols[col] = rows[row][col];
                }
            }
        }

        const result: MatrixPosition[] = [];
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const el = rows[row][col];
                if (el === maxOfRows[row] && el === minOfCols[col]) {
                    result.push({ row, column: col });
                }
            }
        }

        return result;
    }
}