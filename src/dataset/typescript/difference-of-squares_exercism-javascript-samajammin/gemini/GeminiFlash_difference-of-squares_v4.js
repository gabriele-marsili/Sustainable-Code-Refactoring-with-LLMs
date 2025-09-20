"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        this.squareOfSum = this.calcSquareOfSum(num);
        this.sumOfSquares = this.calcSumOfSquares(num);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    calcSquareOfSum(num) {
        const sum = (num * (num + 1)) / 2;
        return sum * sum;
    }
    calcSumOfSquares(num) {
        return (num * (num + 1) * (2 * num + 1)) / 6;
    }
}
exports.default = Squares;
