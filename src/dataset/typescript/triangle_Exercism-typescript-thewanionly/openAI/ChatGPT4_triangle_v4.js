"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        this.sides = sides.sort((a, b) => a - b);
        this.perimeter = this.sides[0] + this.sides[1] + this.sides[2];
        this.uniqueSideCount = new Set(this.sides).size;
    }
    isValid() {
        return this.sides[0] > 0 && this.sides[0] + this.sides[1] > this.sides[2];
    }
    get isEquilateral() {
        return this.uniqueSideCount === 1 && this.isValid();
    }
    get isIsosceles() {
        return this.uniqueSideCount <= 2 && this.isValid();
    }
    get isScalene() {
        return this.uniqueSideCount === 3 && this.isValid();
    }
}
exports.Triangle = Triangle;
