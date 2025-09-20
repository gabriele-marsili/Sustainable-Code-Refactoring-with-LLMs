"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        // Use mathematical formulas instead of array operations
        const sum = (num * (num + 1)) / 2;
        const sumSquares = (num * (num + 1) * (2 * num + 1)) / 6;
        this.squareOfSum = sum * sum;
        this.sumOfSquares = sumSquares;
        this.difference = this.squareOfSum - this.sumOfSquares;
        // Only create array if needed elsewhere
        this.firstN = this.createFirstN(num);
    }
    createFirstN(num) {
        return Array.from({ length: num }, (_, i) => i + 1);
    }
    calcSquareOfSum() {
        return this.squareOfSum;
    }
    calcSumOfSquares() {
        return this.sumOfSquares;
    }
}
exports.default = Squares;
