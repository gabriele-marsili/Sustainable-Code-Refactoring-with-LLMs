"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this.count = count;
    }
    get sumOfSquares() {
        return (this.count * (this.count + 1) * (2 * this.count + 1)) / 6;
    }
    get squareOfSum() {
        return Math.pow((this.count * (this.count + 1)) / 2, 2);
    }
    get difference() {
        return this.squareOfSum - this.sumOfSquares;
    }
}
exports.Squares = Squares;
