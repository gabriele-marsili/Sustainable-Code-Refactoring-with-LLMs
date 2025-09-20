"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squares {
    constructor(num) {
        const { squareOfSum, sumOfSquares } = this.calculate(num);
        this.squareOfSum = squareOfSum;
        this.sumOfSquares = sumOfSquares;
        this.difference = squareOfSum - sumOfSquares;
    }
    calculate(num) {
        let sum = 0;
        let sumOfSquares = 0;
        for (let i = 1; i <= num; i++) {
            sum += i;
            sumOfSquares += i * i;
        }
        return { squareOfSum: sum * sum, sumOfSquares };
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
