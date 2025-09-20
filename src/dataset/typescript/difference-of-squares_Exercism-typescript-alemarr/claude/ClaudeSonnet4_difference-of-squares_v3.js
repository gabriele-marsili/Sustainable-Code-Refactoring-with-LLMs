"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(number) {
        this.number = number;
    }
    get sumOfSquares() {
        let sum = 0;
        for (let i = 1; i <= this.number; i++) {
            sum += i * i;
        }
        return sum;
    }
    get squareOfSum() {
        const sum = (this.number * (this.number + 1)) / 2;
        return sum * sum;
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
