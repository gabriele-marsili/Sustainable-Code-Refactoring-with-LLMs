"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOVEMENTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const EMPTY_FIELD = -1;
function nextPos(pos, movement) {
    return [pos[0] + movement[0], pos[1] + movement[1]];
}
function ofSize(size) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(EMPTY_FIELD));
    const n = size * size;
    let pos = [0, 0];
    let direction = 0;
    for (let i = 1; i <= n; i++) {
        matrix[pos[1]][pos[0]] = i;
        const movement = MOVEMENTS[direction];
        const pos2 = nextPos(pos, movement);
        if (pos2[1] >= 0 &&
            pos2[1] < size &&
            pos2[0] >= 0 &&
            pos2[0] < size &&
            matrix[pos2[1]][pos2[0]] === EMPTY_FIELD) {
            pos = pos2;
        }
        else {
            direction = (direction + 1) % MOVEMENTS.length;
            pos = nextPos(pos, MOVEMENTS[direction]);
        }
    }
    return matrix;
}
exports.default = { ofSize };
