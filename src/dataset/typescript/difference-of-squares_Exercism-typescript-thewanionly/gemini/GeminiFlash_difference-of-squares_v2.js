"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this._count = count;
    }
    get sumOfSquares() {
        if (this._sumOfSquares === undefined) {
            const n = this._count;
            this._sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
        }
        return this._sumOfSquares;
    }
    get squareOfSum() {
        if (this._squareOfSum === undefined) {
            const n = this._count;
            const sum = (n * (n + 1)) / 2;
            this._squareOfSum = sum * sum;
        }
        return this._squareOfSum;
    }
    get difference() {
        if (this._difference === undefined) {
            this._difference = this.squareOfSum - this.sumOfSquares;
        }
        return this._difference;
    }
}
exports.Squares = Squares;
