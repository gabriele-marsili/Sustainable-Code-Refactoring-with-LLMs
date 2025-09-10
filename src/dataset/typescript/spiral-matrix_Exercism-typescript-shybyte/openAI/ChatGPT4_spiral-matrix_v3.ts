type Pos = [number, number];

const MOVEMENTS: ReadonlyArray<Pos> = [[1, 0], [0, 1], [-1, 0], [0, -1]] as const;
const EMPTY_FIELD = -1;

function nextPos([x, y]: Pos, direction: number): Pos {
    const [dx, dy] = MOVEMENTS[direction];
    return [x + dx, y + dy];
}

function ofSize(size: number): number[][] {
    const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(EMPTY_FIELD));
    const n = size * size;
    let [x, y]: Pos = [0, 0];
    let direction = 0;

    for (let i = 1; i <= n; i++) {
        matrix[y][x] = i;
        const [nx, ny] = nextPos([x, y], direction);

        if (nx >= 0 && ny >= 0 && nx < size && ny < size && matrix[ny][nx] === EMPTY_FIELD) {
            [x, y] = [nx, ny];
        } else {
            direction = (direction + 1) % MOVEMENTS.length;
            [x, y] = nextPos([x, y], direction);
        }
    }

    return matrix;
}

export default { ofSize };