"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sameField = (field1, field2) => field1[0] === field2[0] && field1[1] === field2[1];
class QueenAttack {
    constructor({ white, black }) {
        this.canAttackHorizontalOrVertical = () => this.white[0] === this.black[0] || this.white[1] === this.black[1];
        this.canAttackDiagonal = () => {
            const dx = this.white[0] - this.black[0];
            const dy = this.white[1] - this.black[1];
            return Math.abs(dx) === Math.abs(dy) && dx !== 0;
        };
        this.canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
        this.toString = () => {
            const lines = [];
            const [wx, wy] = this.white;
            const [bx, by] = this.black;
            for (let x = 0; x < 8; x++) {
                const row = [];
                for (let y = 0; y < 8; y++) {
                    if (x === bx && y === by) {
                        row.push('B');
                    }
                    else if (x === wx && y === wy) {
                        row.push('W');
                    }
                    else {
                        row.push('_');
                    }
                }
                lines.push(row.join(' '));
            }
            return lines.join('\n') + '\n';
        };
        if (sameField(white, black)) {
            throw 'Queens cannot share the same space';
        }
        this.white = white;
        this.black = black;
    }
}
exports.default = QueenAttack;
