"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = sides.reduce((acc, curr) => acc + curr, 0);
    }
    isValid() {
        if (this._isValid === undefined) {
            this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
        }
        return this._isValid;
    }
    getUniqueSidesCount() {
        if (this._uniqueSidesCount === undefined) {
            const [a, b, c] = this.sides;
            this._uniqueSidesCount = a === b && b === c ? 1 : a === b || b === c || a === c ? 2 : 3;
        }
        return this._uniqueSidesCount;
    }
    get isEquilateral() {
        return this.isValid() && this.getUniqueSidesCount() === 1;
    }
    get isIsosceles() {
        return this.isValid() && this.getUniqueSidesCount() <= 2;
    }
    get isScalene() {
        return this.isValid() && this.getUniqueSidesCount() === 3;
    }
}
exports.Triangle = Triangle;
