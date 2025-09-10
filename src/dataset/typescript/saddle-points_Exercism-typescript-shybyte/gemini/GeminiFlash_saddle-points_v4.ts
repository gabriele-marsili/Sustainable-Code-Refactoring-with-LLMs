type Matrix = number[][]

interface MatrixPosition {
    row: number
    column: number
}

export default class SaddlePoints {
    static saddlePoints(rows: Matrix): MatrixPosition[] {
        if (!rows || rows.length === 0 || rows[0].length === 0) {
            return [];
        }

        const numRows = rows.length;
        const numCols = rows[0].length;
        const result: MatrixPosition[] = [];

        const minOfCols: number[] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            let minVal = rows[0][j];
            for (let i = 1; i < numRows; i++) {
                if (rows[i][j] < minVal) {
                    minVal = rows[i][j];
                }
            }
            minOfCols[j] = minVal;
        }


        for (let i = 0; i < numRows; i++) {
            let maxOfRow = rows[i][0];
            for (let j = 1; j < numCols; j++) {
                if (rows[i][j] > maxOfRow) {
                    maxOfRow = rows[i][j];
                }
            }

            for (let j = 0; j < numCols; j++) {
                if (rows[i][j] >= maxOfRow && rows[i][j] <= minOfCols[j]) {
                    result.push({ row: i, column: j });
                }
            }
        }

        return result;
    }
}