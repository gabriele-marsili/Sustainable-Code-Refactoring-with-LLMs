"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this._isValid = null;
        this._uniqueSidesCount = null;
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = sides.reduce((acc, curr) => acc + curr, 0);
    }
    isValid() {
        if (this._isValid === null) {
            this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
        }
        return this._isValid;
    }
    getUniqueSidesCount() {
        if (this._uniqueSidesCount === null) {
            const [a, b, c] = this.sides;
            if (a === b && b === c) {
                this._uniqueSidesCount = 1;
            }
            else if (a === b || b === c || a === c) {
                this._uniqueSidesCount = 2;
            }
            else {
                this._uniqueSidesCount = 3;
            }
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
