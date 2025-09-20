"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(...sides) {
        if (sides.length !== 3) {
            throw new Error("Triangle must have 3 sides");
        }
        const [a, b, c] = sides.sort((x, y) => x - y);
        this.a = a;
        this.b = b;
        this.c = c;
        this.perimeter = a + b + c;
        this.isValidTriangle = this.perimeter > 0 && a + b > c;
    }
    get isEquilateral() {
        return this.isValidTriangle && this.a === this.c;
    }
    get isIsosceles() {
        return this.isValidTriangle && (this.a === this.b || this.b === this.c);
    }
    get isScalene() {
        return this.isValidTriangle && this.a !== this.b && this.b !== this.c;
    }
}
exports.Triangle = Triangle;
