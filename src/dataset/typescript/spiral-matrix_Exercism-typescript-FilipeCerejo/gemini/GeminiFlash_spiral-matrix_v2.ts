const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
] as const;

export function ofSize(size: number): number[][] {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    let x = 0;
    let y = 0;
    let movementIdx = 0;

    for (let i = 1; i <= size * size; ++i) {
        matrix[x][y] = i;

        let nextX = x + MOVEMENTS[movementIdx][0];
        let nextY = y + MOVEMENTS[movementIdx][1];

        if (nextX >= 0 && nextX < size && nextY >= 0 && nextY < size && matrix[nextX][nextY] === 0) {
            x = nextX;
            y = nextY;
        } else {
            movementIdx = (movementIdx + 1) % 4;
            x += MOVEMENTS[movementIdx][0];
            y += MOVEMENTS[movementIdx][1];
        }
    }

    return matrix;
}