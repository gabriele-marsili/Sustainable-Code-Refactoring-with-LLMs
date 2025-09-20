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
        const board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            const row = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                row.push('_');
            }
            board.push(row);
        }
        board[this.white[0]][this.white[1]] = 'W';
        board[this.black[0]][this.black[1]] = 'B';
        let result = '';
        for (let i = 0; i < BOARD_SIZE; i++) {
            result += board[i].join(' ') + '\n';
        }
        return result;
    }
    canAttack() {
        const rowDiff = this.white[0] - this.black[0];
        const colDiff = this.white[1] - this.black[1];
        return rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff);
    }
}
exports.default = QueenAttack;
