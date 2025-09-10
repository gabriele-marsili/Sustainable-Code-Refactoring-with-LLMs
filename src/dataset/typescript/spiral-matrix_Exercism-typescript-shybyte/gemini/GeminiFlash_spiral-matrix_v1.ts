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
    let x: number, y: number;
    for (let i = 1; i <= size * size; i++) {
        matrix[pos[1]][pos[0]] = i;
        let nextX = pos[0] + MOVEMENTS[direction][0];
        let nextY = pos[1] + MOVEMENTS[direction][1];

        if (nextY >= 0 && nextY < size && nextX >= 0 && nextX < size && matrix[nextY][nextX] === EMPTY_FIELD) {
            pos = [nextX, nextY];
        } else {
            direction = (direction + 1) % 4;
            pos = [pos[0] + MOVEMENTS[direction][0], pos[1] + MOVEMENTS[direction][1]];
        }
    }
    return matrix;
}

export default { ofSize };