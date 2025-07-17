"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        this.firstN = this.createFirstN(num);
        this.squareOfSum = this.calcSquareOfSum();
        this.sumOfSquares = this.calcSumOfSquares();
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    createFirstN(num) {
        const result = [];
        for (let i = 1; i <= num; i++) {
            result.push(i);
        }
        return result;
    }
    calcSquareOfSum() {
        return Math.pow(this.firstN.reduce((res, int) => (res += int), 0), 2);
    }
    calcSumOfSquares() {
        return this.firstN.reduce((res, int) => (res += Math.pow(int, 2)), 0);
    }
}
exports.default = Squares;
