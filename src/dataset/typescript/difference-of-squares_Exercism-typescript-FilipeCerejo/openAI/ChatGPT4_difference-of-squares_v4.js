"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this._count = count;
    }
    get sumOfSquares() {
        return (this._count * (this._count + 1) * (2 * this._count + 1)) / 6;
    }
    get squareOfSum() {
        const sum = (this._count * (this._count + 1)) / 2;
        return sum * sum;
    }
    get difference() {
        const sum = (this._count * (this._count + 1)) / 2;
        const sumOfSquares = (this._count * (this._count + 1) * (2 * this._count + 1)) / 6;
        return sum * sum - sumOfSquares;
    }
}
exports.Squares = Squares;
