"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sameField = (field1, field2) => field1[0] === field2[0] && field1[1] === field2[1];
class QueenAttack {
    constructor({ white, black }) {
        this.canAttackHorizontalOrVertical = () => this.white[0] === this.black[0] || this.white[1] === this.black[1];
        this.canAttackDiagonal = () => {
            const xDiff = this.white[0] - this.black[0];
            const yDiff = this.white[1] - this.black[1];
            return Math.abs(xDiff) === Math.abs(yDiff);
        };
        this.canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
        this.toString = () => {
            let s = "";
            const whiteX = this.white[0];
            const whiteY = this.white[1];
            const blackX = this.black[0];
            const blackY = this.black[1];
            for (let x = 0; x < 8; x++) {
                let row = "";
                for (let y = 0; y < 8; y++) {
                    if (x === blackX && y === blackY) {
                        row += "B";
                    }
                    else if (x === whiteX && y === whiteY) {
                        row += "W";
                    }
                    else {
                        row += "_";
                    }
                    if (y < 7) {
                        row += " ";
                    }
                }
                s += row + "\n";
            }
            return s;
        };
        if (sameField(white, black)) {
            throw "Queens cannot share the same space";
        }
        this.white = white;
        this.black = black;
    }
}
exports.default = QueenAttack;
