"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateSquareOfSum(input) {
    const sum = (input * (input + 1)) >> 1; // Use bitwise shift for division by 2
    return sum * sum;
}
function calculateSumOfSquares(input) {
    return (input * (input + 1) * (2 * input + 1)) / 6;
}
class Squares {
    constructor(input) {
        this.squareOfSum = calculateSquareOfSum(input);
        this.sumOfSquares = calculateSumOfSquares(input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}
exports.default = Squares;
