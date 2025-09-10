const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
] as const;

export function ofSize(size: number): number[][] {
    const matrix = Array.from({ length: size }, () => new Array<number>(size));
    let num = 1;
    let row = 0;
    let col = 0;
    let directionIndex = 0;

    while (num <= size * size) {
        matrix[row][col] = num++;
        const nextRow = row + MOVEMENTS[directionIndex][0];
        const nextCol = col + MOVEMENTS[directionIndex][1];

        if (nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size && matrix[nextRow][nextCol] === undefined) {
            row = nextRow;
            col = nextCol;
        } else {
            directionIndex = (directionIndex + 1) % 4;
            row += MOVEMENTS[directionIndex][0];
            col += MOVEMENTS[directionIndex][1];
        }
    }

    return matrix;
}