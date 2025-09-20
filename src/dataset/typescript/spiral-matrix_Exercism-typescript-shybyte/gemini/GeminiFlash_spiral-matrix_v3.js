"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOVEMENTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;
function nextPos(pos, direction) {
    const movement = MOVEMENTS[direction];
    return [pos[0] + movement[0], pos[1] + movement[1]];
}
function ofSize(size) {
    const matrix = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = Array(size).fill(EMPTY_FIELD);
    }
    let pos = [0, 0];
    let direction = 0;
    for (let i = 1; i <= size * size; i++) {
        matrix[pos[1]][pos[0]] = i;
        let next_pos = nextPos(pos, direction);
        let next_x = next_pos[0];
        let next_y = next_pos[1];
        if (next_x >= 0 && next_x < size && next_y >= 0 && next_y < size && matrix[next_y][next_x] === EMPTY_FIELD) {
            pos = next_pos;
        }
        else {
            direction = (direction + 1) % MOVEMENTS.length;
            pos = nextPos(pos, direction);
        }
    }
    return matrix;
}
exports.default = { ofSize };
