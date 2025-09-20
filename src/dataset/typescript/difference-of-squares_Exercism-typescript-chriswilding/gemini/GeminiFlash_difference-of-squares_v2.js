"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateSquareOfSum(input) {
    const sum = input * (input + 1) / 2;
    return sum * sum;
}
function calculateSumOfSquares(input) {
    return input * (input + 1) * (2 * input + 1) / 6;
}
class Squares {
    constructor(input) {
        this.input = input;
        this.squareOfSum = calculateSquareOfSum(this.input);
        this.sumOfSquares = calculateSumOfSquares(this.input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    getDifference() {
        return this.difference;
    }
    getSquareOfSum() {
        return this.squareOfSum;
    }
    getSumOfSquares() {
        return this.sumOfSquares;
    }
}
exports.default = Squares;
