"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squares = void 0;
class Squares {
    constructor(count) {
        this._count = count;
    }
    get sumOfSquares() {
        let sum = 0;
        for (let i = 1; i <= this._count; i++) {
            sum += i * i;
        }
        return sum;
    }
    get squareOfSum() {
        let sum = 0;
        for (let i = 1; i <= this._count; i++) {
            sum += i;
        }
        return sum * sum;
    }
    get difference() {
        let sum = 0;
        let sumSquares = 0;
        for (let i = 1; i <= this._count; i++) {
            sum += i;
            sumSquares += i * i;
        }
        return sum * sum - sumSquares;
    }
}
exports.Squares = Squares;
