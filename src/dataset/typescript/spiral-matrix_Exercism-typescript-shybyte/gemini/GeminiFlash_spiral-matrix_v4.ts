type Pos = [number, number];

const MOVEMENTS: Pos[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;

function nextPos(pos: Pos, direction: number): Pos {
    const movement = MOVEMENTS[direction];
    return [pos[0] + movement[0], pos[1] + movement[1]];
}

function ofSize(size: number) {
    const matrix: number[][] = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = Array(size).fill(EMPTY_FIELD);
    }

    let pos: Pos = [0, 0];
    let direction = 0;

    for (let i = 1; i <= size * size; i++) {
        matrix[pos[1]][pos[0]] = i;
        let next_x = pos[0] + MOVEMENTS[direction][0];
        let next_y = pos[1] + MOVEMENTS[direction][1];

        if (next_y >= 0 && next_y < size && next_x >= 0 && next_x < size && matrix[next_y][next_x] === EMPTY_FIELD) {
            pos = [next_x, next_y];
        } else {
            direction = (direction + 1) % MOVEMENTS.length;
            pos = nextPos(pos, direction);
        }
    }
    return matrix;
}

export default { ofSize };