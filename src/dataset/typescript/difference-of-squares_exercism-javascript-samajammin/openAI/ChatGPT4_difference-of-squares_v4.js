"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        const sum = (num * (num + 1)) / 2;
        const sumOfSquares = (num * (num + 1) * (2 * num + 1)) / 6;
        this.squareOfSum = Math.pow(sum, 2);
        this.sumOfSquares = sumOfSquares;
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}
exports.default = Squares;
