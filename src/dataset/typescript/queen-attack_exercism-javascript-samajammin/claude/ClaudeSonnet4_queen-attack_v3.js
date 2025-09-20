"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BOARD_SIZE = 8;
class QueenAttack {
    constructor({ white, black }) {
        if (white[0] === black[0] && white[1] === black[1]) {
            throw 'Queens cannot share the same space';
        }
        this.white = white;
        this.black = black;
    }
    toString() {
        const rows = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            const cells = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (row === this.white[0] && col === this.white[1]) {
                    cells.push('W');
                }
                else if (row === this.black[0] && col === this.black[1]) {
                    cells.push('B');
                }
                else {
                    cells.push('_');
                }
            }
            rows.push(cells.join(' '));
        }
        return rows.join('\n') + '\n';
    }
    canAttack() {
        const rowDiff = Math.abs(this.white[0] - this.black[0]);
        const colDiff = Math.abs(this.white[1] - this.black[1]);
        return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
    }
}
exports.default = QueenAttack;
