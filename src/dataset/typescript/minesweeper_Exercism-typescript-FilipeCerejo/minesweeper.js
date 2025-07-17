"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = annotate;
const ADJACENTS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
function isValid(p, field) {
    return !(p[0] < 0 || p[0] >= field.length || p[1] < 0 || p[1] >= field[p[0]].length);
}
function isMine(p, field) {
    return field[p[0]][p[1]] === '*';
}
function replaceChar(s, idx, replacement) {
    return s.substring(0, idx) + replacement + s.substring(idx + 1);
}
function annotate(field) {
    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[row].length; col++) {
            if (field[row][col] === ' ') {
                let sum = 0;
                ADJACENTS.forEach((adj) => {
                    let point = [row + adj[0], col + adj[1]];
                    if (isValid(point, field) && isMine(point, field)) {
                        sum++;
                    }
                });
                if (sum) {
                    field[row] = replaceChar(field[row], col, String(sum));
                }
            }
        }
    }
    return field;
}
