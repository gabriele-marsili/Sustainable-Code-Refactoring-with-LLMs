"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.sides = [a, b, c].sort((x, y) => x - y);
        this.isValid = this.sides[0] > 0 && this.sides[0] + this.sides[1] > this.sides[2];
    }
    get isEquilateral() {
        return this.isValid && this.a === this.b && this.b === this.c;
    }
    get isIsosceles() {
        return this.isValid && (this.a === this.b || this.b === this.c || this.c === this.a);
    }
    get isScalene() {
        return this.isValid && this.a !== this.b && this.b !== this.c && this.c !== this.a;
    }
    kind(triangleKind) {
        if (!this.isValid)
            return false;
        switch (triangleKind) {
            case "equilateral":
                return this.isEquilateral;
            case "isosceles":
                return this.isIsosceles;
            case "scalene":
                return this.isScalene;
        }
    }
}
exports.Triangle = Triangle;
