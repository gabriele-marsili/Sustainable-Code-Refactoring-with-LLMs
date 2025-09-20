"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOVEMENTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;
function ofSize(size) {
    const matrix = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = Array(size).fill(EMPTY_FIELD);
    }
    const n = size * size;
    let x = 0, y = 0;
    let direction = 0;
    for (let i = 1; i <= n; i++) {
        matrix[y][x] = i;
        const movement = MOVEMENTS[direction];
        const nextX = x + movement[0];
        const nextY = y + movement[1];
        if (nextY >= 0 && nextY < size && nextX >= 0 && nextX < size && matrix[nextY][nextX] === EMPTY_FIELD) {
            x = nextX;
            y = nextY;
        }
        else {
            direction = (direction + 1) & 3;
            const newMovement = MOVEMENTS[direction];
            x += newMovement[0];
            y += newMovement[1];
        }
    }
    return matrix;
}
exports.default = { ofSize };
