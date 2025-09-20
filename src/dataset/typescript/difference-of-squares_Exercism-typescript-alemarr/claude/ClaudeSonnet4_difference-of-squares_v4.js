"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(number) {
        this.number = number;
        this._sumOfSquares = null;
        this._squareOfSum = null;
    }
    get sumOfSquares() {
        if (this._sumOfSquares === null) {
            this._sumOfSquares = (this.number * (this.number + 1) * (2 * this.number + 1)) / 6;
        }
        return this._sumOfSquares;
    }
    get squareOfSum() {
        if (this._squareOfSum === null) {
            const sum = (this.number * (this.number + 1)) / 2;
            this._squareOfSum = sum * sum;
        }
        return this._squareOfSum;
    }
    get difference() {
        return this.squareOfSum - this.sumOfSquares;
    }
    squareOf(number) {
        return number * number;
    }
    getNumbers() {
        const result = new Array(this.number);
        for (let i = 0; i < this.number; i++) {
            result[i] = i + 1;
        }
        return result;
    }
}
exports.Squares = Squares;
