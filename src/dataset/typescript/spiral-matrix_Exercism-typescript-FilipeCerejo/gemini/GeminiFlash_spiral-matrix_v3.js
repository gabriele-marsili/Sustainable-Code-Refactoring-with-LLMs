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
    return (movementIndex < 2) ? (index < size) : (index >= 0);
}
function nextMovement(movementIdx) {
    return (movementIdx + 1) % MOVEMENTS.length;
}
function ofSize(size) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    let movementIdx = 0;
    let x = 0;
    let y = 0;
    for (let m = 1; m <= size * size; m++) {
        matrix[x][y] = m;
        let nextX = x + MOVEMENTS[movementIdx][0];
        let nextY = y + MOVEMENTS[movementIdx][1];
        if (nextX >= 0 && nextX < size &&
            nextY >= 0 && nextY < size &&
            matrix[nextX][nextY] === 0) {
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
