"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sameField = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;
class QueenAttack {
    constructor({ white, black }) {
        this.canAttackHorizontalOrVertical = () => this.white[0] === this.black[0] || this.white[1] === this.black[1];
        this.canAttackDiagonal = () => {
            const [dx, dy] = [Math.abs(this.white[0] - this.black[0]), Math.abs(this.white[1] - this.black[1])];
            return dx === dy;
        };
        this.canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
        this.toString = () => {
            const board = Array.from({ length: 8 }, (_, x) => Array.from({ length: 8 }, (_, y) => sameField(this.black, [x, y]) ? 'B' : sameField(this.white, [x, y]) ? 'W' : '_').join(' '));
            return board.join('\n') + '\n';
        };
        if (sameField(white, black)) {
            throw new Error('Queens cannot share the same space');
        }
        this.white = white;
        this.black = black;
    }
}
exports.default = QueenAttack;
