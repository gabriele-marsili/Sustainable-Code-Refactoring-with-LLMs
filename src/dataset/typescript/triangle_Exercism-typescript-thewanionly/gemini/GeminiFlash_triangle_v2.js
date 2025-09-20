"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        sides.sort((a, b) => a - b);
        this.side1 = sides[0];
        this.side2 = sides[1];
        this.side3 = sides[2];
        const perimeter = this.side1 + this.side2 + this.side3;
        this.isValidTriangle = perimeter > 0 && this.side1 + this.side2 > this.side3;
    }
    get isEquilateral() {
        return this.isValidTriangle && this.side1 === this.side2 && this.side2 === this.side3;
    }
    get isIsosceles() {
        return this.isValidTriangle && (this.side1 === this.side2 || this.side1 === this.side3 || this.side2 === this.side3);
    }
    get isScalene() {
        return this.isValidTriangle && this.side1 !== this.side2 && this.side1 !== this.side3 && this.side2 !== this.side3;
    }
}
exports.Triangle = Triangle;
