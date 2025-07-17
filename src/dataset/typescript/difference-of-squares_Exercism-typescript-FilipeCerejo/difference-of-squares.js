"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this._count = count;
    }
    get sumOfSquares() {
        return this.recSumOfSquares(this._count);
    }
    recSumOfSquares(c, sum = 0) {
        if (c === 0) {
            return sum;
        }
        return this.recSumOfSquares(c - 1, sum + Math.pow(c, 2));
    }
    get squareOfSum() {
        return this.recSquareOfSum(this._count);
    }
    recSquareOfSum(c, sum = 0) {
        if (c === 0) {
            return Math.pow(sum, 2);
        }
        return this.recSquareOfSum(c - 1, sum + c);
    }
    get difference() {
        return this.recDifference(this._count);
    }
    recDifference(n, sum = 0, sumSquares = 0) {
        if (n === 0) {
            return Math.pow(sum, 2) - sumSquares;
        }
        return this.recDifference(n - 1, sum + n, sumSquares + Math.pow(n, 2));
    }
}
exports.Squares = Squares;
