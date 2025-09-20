"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this.count = count;
        this.sum = (count * (count + 1)) / 2;
        this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
        this.squareOfSumValue = this.sum * this.sum;
    }
    get sumOfSquares() {
        return this.sumOfSquaresValue;
    }
    get squareOfSum() {
        return this.squareOfSumValue;
    }
    get difference() {
        return this.squareOfSumValue - this.sumOfSquaresValue;
    }
}
exports.Squares = Squares;
