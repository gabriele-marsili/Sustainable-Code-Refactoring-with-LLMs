"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sameField = (field1, field2) => field1[0] === field2[0] && field1[1] === field2[1];
class QueenAttack {
    constructor({ white, black }) {
        if (sameField(white, black)) {
            throw 'Queens cannot share the same space';
        }
        this.white = white;
        this.black = black;
    }
    canAttackHorizontalOrVertical() {
        return this.white[0] === this.black[0] || this.white[1] === this.black[1];
    }
    canAttackDiagonal() {
        const dx = this.white[0] - this.black[0];
        const dy = this.white[1] - this.black[1];
        return Math.abs(dx) === Math.abs(dy) && dx !== 0;
    }
    canAttack() {
        return this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
    }
    toString() {
        const result = [];
        const [whiteX, whiteY] = this.white;
        const [blackX, blackY] = this.black;
        for (let x = 0; x < 8; x++) {
            const row = [];
            for (let y = 0; y < 8; y++) {
                if (x === blackX && y === blackY) {
                    row.push('B');
                }
                else if (x === whiteX && y === whiteY) {
                    row.push('W');
                }
                else {
                    row.push('_');
                }
            }
            result.push(row.join(' '));
        }
        return result.join('\n') + '\n';
    }
}
exports.default = QueenAttack;
