"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this.sumOfN = (count * (count + 1)) / 2;
        this.sumOfNSquares = (count * (count + 1) * (2 * count + 1)) / 6;
    }
    get sumOfSquares() {
        return this.sumOfNSquares;
    }
    get squareOfSum() {
        return this.sumOfN * this.sumOfN;
    }
    get difference() {
        return this.squareOfSum - this.sumOfSquares;
    }
}
exports.Squares = Squares;
