"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this.count = count;
        const sum = (count * (count + 1)) / 2;
        this.squareOfSumValue = sum * sum;
        this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
        this.differenceValue = this.squareOfSumValue - this.sumOfSquaresValue;
    }
    get sumOfSquares() {
        return this.sumOfSquaresValue;
    }
    get squareOfSum() {
        return this.squareOfSumValue;
    }
    get difference() {
        return this.differenceValue;
    }
}
exports.Squares = Squares;
