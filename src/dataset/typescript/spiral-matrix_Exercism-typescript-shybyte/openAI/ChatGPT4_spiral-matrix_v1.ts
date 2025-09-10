type Pos = [number, number];

const MOVEMENTS: Pos[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;

function nextPos(pos: Pos, direction: number): Pos {
    const [dx, dy] = MOVEMENTS[direction];
    return [pos[0] + dx, pos[1] + dy];
}

function ofSize(size: number) {
    const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(EMPTY_FIELD));
    const n = size * size;
    let [x, y]: Pos = [0, 0];
    let direction = 0;

    for (let i = 1; i <= n; i++) {
        matrix[y][x] = i;
        const [nx, ny] = nextPos([x, y], direction);

        if (nx >= 0 && nx < size && ny >= 0 && ny < size && matrix[ny][nx] === EMPTY_FIELD) {
            [x, y] = [nx, ny];
        } else {
            direction = (direction + 1) % MOVEMENTS.length;
            [x, y] = nextPos([x, y], direction);
        }
    }

    return matrix;
}

export default { ofSize };