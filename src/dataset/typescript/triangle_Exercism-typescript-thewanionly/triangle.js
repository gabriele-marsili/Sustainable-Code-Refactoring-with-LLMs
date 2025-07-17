"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = sides.reduce((acc, curr) => acc + curr, 0);
    }
    isValid() {
        return this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
    }
    get isEquilateral() {
        return this.isValid() && new Set(this.sides).size === 1;
    }
    get isIsosceles() {
        return this.isValid() && new Set(this.sides).size <= 2;
    }
    get isScalene() {
        return this.isValid() && new Set(this.sides).size === 3;
    }
}
exports.Triangle = Triangle;
