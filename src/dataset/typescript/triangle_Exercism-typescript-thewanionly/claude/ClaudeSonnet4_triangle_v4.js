"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = sides.reduce((acc, curr) => acc + curr, 0);
        this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
        if (this._isValid) {
            this._uniqueSidesCount = this.sides[0] === this.sides[1]
                ? (this.sides[1] === this.sides[2] ? 1 : 2)
                : (this.sides[1] === this.sides[2] ? 2 : 3);
        }
        else {
            this._uniqueSidesCount = 0;
        }
    }
    isValid() {
        return this._isValid;
    }
    get isEquilateral() {
        return this._isValid && this._uniqueSidesCount === 1;
    }
    get isIsosceles() {
        return this._isValid && this._uniqueSidesCount <= 2;
    }
    get isScalene() {
        return this._isValid && this._uniqueSidesCount === 3;
    }
}
exports.Triangle = Triangle;
