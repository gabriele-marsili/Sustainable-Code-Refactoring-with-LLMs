"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(input) {
        this.squareOfSum = this.calculateSquareOfSum(input);
        this.sumOfSquares = this.calculateSumOfSquares(input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    calculateSquareOfSum(input) {
        const sum = input * (input + 1) / 2;
        return sum * sum;
    }
    calculateSumOfSquares(input) {
        return (input * (input + 1) * (2 * input + 1)) / 6;
    }
}
exports.default = Squares;
