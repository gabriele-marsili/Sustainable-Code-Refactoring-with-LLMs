type Matrix = number[][];

interface MatrixPosition {
    row: number;
    column: number;
}

export default class SaddlePoints {
    static saddlePoints(rows: Matrix): MatrixPosition[] {
        const result: MatrixPosition[] = [];
        const minOfCols: number[] = Array(rows[0].length).fill(Infinity);
        const maxOfRows: number[] = rows.map(row => Math.max(...row));

        rows.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el < minOfCols[colIndex]) {
                    minOfCols[colIndex] = el;
                }
            });
        });

        rows.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el === maxOfRows[rowIndex] && el === minOfCols[colIndex]) {
                    result.push({ row: rowIndex, column: colIndex });
                }
            });
        });

        return result;
    }
}