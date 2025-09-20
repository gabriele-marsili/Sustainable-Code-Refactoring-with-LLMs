"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatSquareOfSum(input) {
    const sum = input * (input + 1) * 0.5;
    return sum * sum;
}
function calculatSumOfSquares(input) {
    return (input * (input + 1) * (input + input + 1)) / 6;
}
class Squares {
    constructor(input) {
        const halfSum = input * (input + 1) * 0.5;
        this.squareOfSum = halfSum * halfSum;
        this.sumOfSquares = (input * (input + 1) * (input + input + 1)) / 6;
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}
exports.default = Squares;
