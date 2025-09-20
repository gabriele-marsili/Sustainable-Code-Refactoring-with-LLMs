"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatSquareOfSum(input) {
    const n = input;
    const sum = (n * (n + 1)) >> 1; // Use bitwise shift for division by 2
    return sum * sum;
}
function calculatSumOfSquares(input) {
    const n = input;
    return (n * (n + 1) * ((n << 1) + 1)) / 6; // Use bitwise shift for multiplication by 2
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
