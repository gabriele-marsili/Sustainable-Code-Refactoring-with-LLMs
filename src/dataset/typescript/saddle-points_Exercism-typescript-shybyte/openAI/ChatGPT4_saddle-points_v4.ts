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

        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                if (rows[rowIndex][colIndex] < minOfCols[colIndex]) {
                    minOfCols[colIndex] = rows[rowIndex][colIndex];
                }
            }
        }

        const result: MatrixPosition[] = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                const el = rows[rowIndex][colIndex];
                if (el === maxOfRows[rowIndex] && el === minOfCols[colIndex]) {
                    result.push({ row: rowIndex, column: colIndex });
                }
            }
        }

        return result;
    }
}