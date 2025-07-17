"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(number) {
        this.number = number;
    }
    get sumOfSquares() {
        return this.getNumbers().reduce((acc, value) => {
            acc += this.squareOf(value);
            return acc;
        }, 0);
    }
    get squareOfSum() {
        const sum = this.getNumbers().reduce((acc, value) => acc + value, 0);
        return this.squareOf(sum);
    }
    get difference() {
        return this.squareOfSum - this.sumOfSquares;
    }
    squareOf(number) {
        return Math.pow(number, 2);
    }
    getNumbers() {
        return (new Array(this.number))
            .fill(1)
            .map((number, index) => {
            return number + index;
        });
    }
}
exports.Squares = Squares;
