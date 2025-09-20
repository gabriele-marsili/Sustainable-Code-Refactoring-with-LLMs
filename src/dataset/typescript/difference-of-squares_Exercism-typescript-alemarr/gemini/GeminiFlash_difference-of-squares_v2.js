"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(number) {
        this.number = number;
        this.sum = (number * (number + 1)) / 2;
        this.sumOfSquaresValue = (number * (number + 1) * (2 * number + 1)) / 6;
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
