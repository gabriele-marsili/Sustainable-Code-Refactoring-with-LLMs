type MatrixType = number[][];
type SaddlePointType = {
    row: number;
    column: number;
};

export function saddlePoints(matrix: MatrixType): SaddlePointType[] {
    const saddlePoints: SaddlePointType[] = [];
    const rowMax = matrix.map(row => Math.max(...row));
    const colMin = matrix[0].map((_, col) => Math.min(...matrix.map(row => row[col])));

    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[row].length; column++) {
            if (matrix[row][column] === rowMax[row] && matrix[row][column] === colMin[column]) {
                saddlePoints.push({ row: row + 1, column: column + 1 });
            }
        }
    }

    return saddlePoints;
}