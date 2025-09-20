"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatSquareOfSum(input) {
    const sum = (input * (input + 1)) >> 1;
    return sum * sum;
}
function calculatSumOfSquares(input) {
    return (input * (input + 1) * ((input << 1) + 1)) / 6;
}
class Squares {
    constructor(input) {
        const squareOfSum = calculatSquareOfSum(input);
        const sumOfSquares = calculatSumOfSquares(input);
        this.squareOfSum = squareOfSum;
        this.sumOfSquares = sumOfSquares;
        this.difference = squareOfSum - sumOfSquares;
    }
}
exports.default = Squares;
