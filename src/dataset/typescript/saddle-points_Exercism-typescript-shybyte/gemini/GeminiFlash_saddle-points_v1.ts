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

        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            const row = rows[rowIndex];
            let maxOfRow = row[0];
            for (let i = 1; i < numCols; i++) {
                if (row[i] > maxOfRow) {
                    maxOfRow = row[i];
                }
            }

            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                const el = row[colIndex];
                if (el >= maxOfRow) {
                    let minOfCol = rows[0][colIndex];
                    for (let k = 1; k < numRows; k++) {
                        if (rows[k][colIndex] < minOfCol) {
                            minOfCol = rows[k][colIndex];
                        }
                    }

                    if (el <= minOfCol) {
                        result.push({
                            row: rowIndex,
                            column: colIndex
                        });
                    }
                }
            }
        }

        return result;
    }
}