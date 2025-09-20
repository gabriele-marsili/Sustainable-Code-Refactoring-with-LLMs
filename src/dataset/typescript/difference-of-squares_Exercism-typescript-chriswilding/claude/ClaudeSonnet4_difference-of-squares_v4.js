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
        const inputPlusOne = input + 1;
        const sum = input * inputPlusOne * 0.5;
        this.squareOfSum = sum * sum;
        this.sumOfSquares = (input * inputPlusOne * (input + input + 1)) / 6;
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}
exports.default = Squares;
