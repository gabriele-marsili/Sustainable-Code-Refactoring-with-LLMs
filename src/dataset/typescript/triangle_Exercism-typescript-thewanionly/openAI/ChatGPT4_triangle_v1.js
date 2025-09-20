"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = this.sides[0] + this.sides[1] + this.sides[2];
        this.uniqueSidesCount = new Set(this.sides).size;
    }
    isValid() {
        return this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
    }
    get isEquilateral() {
        return this.isValid() && this.uniqueSidesCount === 1;
    }
    get isIsosceles() {
        return this.isValid() && this.uniqueSidesCount <= 2;
    }
    get isScalene() {
        return this.isValid() && this.uniqueSidesCount === 3;
    }
}
exports.Triangle = Triangle;
