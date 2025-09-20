"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        this.squareOfSum = this.calcSquareOfSum(num);
        this.sumOfSquares = this.calcSumOfSquares(num);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    calcSquareOfSum(num) {
        const sum = (num * (num + 1)) / 2; // Sum of first N natural numbers
        return Math.pow(sum, 2);
    }
    calcSumOfSquares(num) {
        return (num * (num + 1) * (2 * num + 1)) / 6; // Sum of squares of first N natural numbers
    }
}
exports.default = Squares;
