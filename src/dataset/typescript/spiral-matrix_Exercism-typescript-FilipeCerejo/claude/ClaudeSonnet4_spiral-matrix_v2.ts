const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
] as const;

export function ofSize(size: number): number[][] {
    const matrix: number[][] = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size);
    }

    let movementIdx = 0;
    let x = 0;
    let y = 0;

    for (let m = 1; m <= size * size; m++) {
        matrix[x][y] = m;

        const movement = MOVEMENTS[movementIdx];
        const nextX = x + movement[0];
        const nextY = y + movement[1];

        if (nextX >= 0 && nextX < size && nextY >= 0 && nextY < size && !matrix[nextX][nextY]) {
            x = nextX;
            y = nextY;
        } else {
            movementIdx = (movementIdx + 1) & 3;
            const newMovement = MOVEMENTS[movementIdx];
            x += newMovement[0];
            y += newMovement[1];
        }
    }

    return matrix;
}