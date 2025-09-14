const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
] as const;

export function ofSize(size: number): number[][] {
    const matrix: number[][] = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = Array(size).fill(0);
    }

    let movementIdx = 0;
    let x = 0;
    let y = 0;
    const totalCells = size * size;

    for (let m = 1; m <= totalCells; m++) {
        matrix[x][y] = m;

        const [dx, dy] = MOVEMENTS[movementIdx];
        const nextX = x + dx;
        const nextY = y + dy;

        if (nextX >= 0 && nextX < size && nextY >= 0 && nextY < size && matrix[nextX][nextY] === 0) {
            x = nextX;
            y = nextY;
        } else {
            movementIdx = (movementIdx + 1) & 3;
            const [newDx, newDy] = MOVEMENTS[movementIdx];
            x += newDx;
            y += newDy;
        }
    }

    return matrix;
}