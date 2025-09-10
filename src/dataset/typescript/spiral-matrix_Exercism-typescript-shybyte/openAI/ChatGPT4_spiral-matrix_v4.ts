type Pos = [number, number];

const MOVEMENTS: Pos[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;

function nextPos([x, y]: Pos, [dx, dy]: Pos): Pos {
    return [x + dx, y + dy];
}

function ofSize(size: number): number[][] {
    const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(EMPTY_FIELD));
    const n = size * size;
    let [x, y]: Pos = [0, 0];
    let directionIndex = 0;

    for (let i = 1; i <= n; i++) {
        matrix[y][x] = i;
        const [nx, ny] = nextPos([x, y], MOVEMENTS[directionIndex]);
        if (nx >= 0 && ny >= 0 && nx < size && ny < size && matrix[ny][nx] === EMPTY_FIELD) {
            [x, y] = [nx, ny];
        } else {
            directionIndex = (directionIndex + 1) % MOVEMENTS.length;
            [x, y] = nextPos([x, y], MOVEMENTS[directionIndex]);
        }
    }

    return matrix;
}

export default { ofSize };