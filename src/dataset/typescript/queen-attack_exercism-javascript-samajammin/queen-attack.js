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
        let board = Array(BOARD_SIZE).fill(null);
        board = board.map(_ => Array(BOARD_SIZE).fill('_'));
        board[this.white[0]][this.white[1]] = 'W';
        board[this.black[0]][this.black[1]] = 'B';
        return board.map(row => row.join(' ')).join('\n') + '\n';
    }
    canAttack() {
        const rowDiff = Math.abs(this.white[0] - this.black[0]);
        const colDiff = Math.abs(this.white[1] - this.black[1]);
        if (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = QueenAttack;
