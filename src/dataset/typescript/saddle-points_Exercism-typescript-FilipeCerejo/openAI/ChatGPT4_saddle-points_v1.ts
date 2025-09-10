type MatrixType = number[][];
type SaddlePointType = {
    row: number;
    column: number;
};

export function saddlePoints(matrix: MatrixType): SaddlePointType[] {
    const saddlePoints: SaddlePointType[] = [];
    const rowMaxes = matrix.map(row => Math.max(...row));
    const colMins = matrix[0].map((_, col) => Math.min(...matrix.map(row => row[col])));

    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[row].length; column++) {
            if (matrix[row][column] === rowMaxes[row] && matrix[row][column] === colMins[column]) {
                saddlePoints.push({ row: row + 1, column: column + 1 });
            }
        }
    }

    return saddlePoints;
}