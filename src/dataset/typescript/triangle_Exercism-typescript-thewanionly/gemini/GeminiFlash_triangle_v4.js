"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        sides.sort((x, y) => x - y);
        this.a = sides[0];
        this.b = sides[1];
        this.c = sides[2];
        this.perimeter = this.a + this.b + this.c;
        this.isValidTriangle = this.perimeter > 0 && this.a + this.b > this.c;
    }
    get isEquilateral() {
        return this.isValidTriangle && this.a === this.b && this.b === this.c;
    }
    get isIsosceles() {
        return this.isValidTriangle && (this.a === this.b || this.b === this.c || this.a === this.c);
    }
    get isScalene() {
        return this.isValidTriangle && this.a !== this.b && this.b !== this.c && this.a !== this.c;
    }
}
exports.Triangle = Triangle;
