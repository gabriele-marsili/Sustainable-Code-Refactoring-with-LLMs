"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this.count = count;
        this.sum = (count * (count + 1)) / 2;
        this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
    }
    get sumOfSquares() {
        return this.sumOfSquaresValue;
    }
    get squareOfSum() {
        return this.sum * this.sum;
    }
    get difference() {
        return this.squareOfSum - this.sumOfSquares;
    }
}
exports.Squares = Squares;
