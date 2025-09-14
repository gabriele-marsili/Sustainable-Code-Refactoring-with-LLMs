type MatrixType = number[][];
type SaddlePointType = {
    row: number;
    column: number;
};

export function saddlePoints(matrix: MatrixType): SaddlePointType[] {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const saddlePoints: SaddlePointType[] = [];

    const rowMaxIndices = new Array(rows);
    const colMinIndices = new Array(cols);

    for (let row = 0; row < rows; row++) {
        let maxVal = matrix[row][0];
        let maxIdx = 0;
        for (let col = 1; col < cols; col++) {
            if (matrix[row][col] > maxVal) {
                maxVal = matrix[row][col];
                maxIdx = col;
            }
        }
        rowMaxIndices[row] = { value: maxVal, index: maxIdx };
    }

    for (let col = 0; col < cols; col++) {
        let minVal = matrix[0][col];
        let minIdx = 0;
        for (let row = 1; row < rows; row++) {
            if (matrix[row][col] < minVal) {
                minVal = matrix[row][col];
                minIdx = row;
            }
        }
        colMinIndices[col] = { value: minVal, index: minIdx };
    }

    for (let row = 0; row < rows; row++) {
        const maxCol = rowMaxIndices[row].index;
        const maxVal = rowMaxIndices[row].value;
        
        if (colMinIndices[maxCol].value === maxVal && colMinIndices[maxCol].index === row) {
            saddlePoints.push({ row: row + 1, column: maxCol + 1 });
        }
    }

    return saddlePoints;
}