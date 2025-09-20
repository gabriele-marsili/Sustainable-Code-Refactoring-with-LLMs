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
    const matrix = Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size).fill(0);
    }
    let movementIdx = 0;
    let x = 0;
    let y = 0;
    const totalCells = size * size;
    for (let m = 1; m <= totalCells; m++) {
        matrix[x][y] = m;
        const [dx, dy] = MOVEMENTS[movementIdx];
        const nextX = x + dx;
        const nextY = y + dy;
        if (getMovementCheck(movementIdx, dx ? nextX : nextY, size) && !matrix[nextX][nextY]) {
            x = nextX;
            y = nextY;
        }
        else {
            movementIdx = nextMovement(movementIdx);
            const [newDx, newDy] = MOVEMENTS[movementIdx];
            x += newDx;
            y += newDy;
        }
    }
    return matrix;
}
