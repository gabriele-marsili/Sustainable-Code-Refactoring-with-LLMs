"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        this.firstN = this.createFirstN(num);
        const sum = (num * (num + 1)) / 2;
        this.squareOfSum = sum * sum;
        this.sumOfSquares = (num * (num + 1) * (2 * num + 1)) / 6;
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
    createFirstN(num) {
        return Array.from({ length: num }, (_, i) => i + 1);
    }
    calcSquareOfSum() {
        const sum = (this.firstN.length * (this.firstN.length + 1)) / 2;
        return sum * sum;
    }
    calcSumOfSquares() {
        const n = this.firstN.length;
        return (n * (n + 1) * (2 * n + 1)) / 6;
    }
}
exports.default = Squares;
