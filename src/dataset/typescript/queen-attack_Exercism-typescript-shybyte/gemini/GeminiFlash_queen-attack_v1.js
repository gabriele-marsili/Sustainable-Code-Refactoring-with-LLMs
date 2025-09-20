"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sameField = (field1, field2) => {
    return field1[0] === field2[0] && field1[1] === field2[1];
};
class QueenAttack {
    constructor({ white, black }) {
        if (sameField(white, black)) {
            throw new Error('Queens cannot share the same space');
        }
        this.white = white;
        this.black = black;
    }
    canAttackHorizontalOrVertical() {
        return this.white[0] === this.black[0] || this.white[1] === this.black[1];
    }
    canAttackDiagonal() {
        const rowDiff = this.white[0] - this.black[0];
        const colDiff = this.white[1] - this.black[1];
        return Math.abs(rowDiff) === Math.abs(colDiff);
    }
    canAttack() {
        return this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
    }
    toString() {
        let board = '';
        for (let row = 0; row < 8; row++) {
            let rowString = '';
            for (let col = 0; col < 8; col++) {
                if (this.white[0] === row && this.white[1] === col) {
                    rowString += 'W';
                }
                else if (this.black[0] === row && this.black[1] === col) {
                    rowString += 'B';
                }
                else {
                    rowString += '_';
                }
                if (col < 7) {
                    rowString += ' ';
                }
            }
            board += rowString + '\n';
        }
        return board;
    }
}
exports.default = QueenAttack;
