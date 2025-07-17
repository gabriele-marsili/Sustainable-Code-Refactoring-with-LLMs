"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatSquareOfSum(input) {
    const sum = input * (input + 1) / 2;
    return sum * sum;
}
function calculatSumOfSquares(input) {
    return (input * (input + 1) * (2 * input + 1)) / 6;
}
class Squares {
    constructor(input) {
        this.squareOfSum = calculatSquareOfSum(input);
        this.sumOfSquares = calculatSumOfSquares(input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}
exports.default = Squares;
