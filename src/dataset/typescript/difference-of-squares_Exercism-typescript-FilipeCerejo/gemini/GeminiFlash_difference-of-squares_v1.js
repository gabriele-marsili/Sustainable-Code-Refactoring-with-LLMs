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
        let sumOfSquares = 0;
        let sum = 0;
        for (let i = 1; i <= this._count; i++) {
            sum += i;
            sumOfSquares += i * i;
        }
        return sum * sum - sumOfSquares;
    }
}
exports.Squares = Squares;
