"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofSize = ofSize;
const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
function getMovementCheck(movementIndex, index, size) {
    return movementIndex < 2 ? index < size : index >= 0;
}
function nextMovement(movementIdx) {
    return (movementIdx + 1) % MOVEMENTS.length;
}
function ofSize(size) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    let movementIdx = 0, x = 0, y = 0;
    for (let m = 1; m <= size * size; m++) {
        matrix[x][y] = m;
        const [dx, dy] = MOVEMENTS[movementIdx];
        const nextX = x + dx, nextY = y + dy;
        if (nextX >= 0 && nextX < size &&
            nextY >= 0 && nextY < size &&
            !matrix[nextX][nextY]) {
            x = nextX;
            y = nextY;
        }
        else {
            movementIdx = nextMovement(movementIdx);
            x += MOVEMENTS[movementIdx][0];
            y += MOVEMENTS[movementIdx][1];
        }
    }
    return matrix;
}
