"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this._count = count;
    }
    get sumOfSquares() {
        const n = this._count;
        return (n * (n + 1) * (2 * n + 1)) / 6;
    }
    get squareOfSum() {
        const n = this._count;
        const sum = (n * (n + 1)) / 2;
        return sum * sum;
    }
    get difference() {
        const n = this._count;
        const sum = (n * (n + 1)) / 2;
        const sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
        return sum * sum - sumOfSquares;
    }
}
exports.Squares = Squares;
