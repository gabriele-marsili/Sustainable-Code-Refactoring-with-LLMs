"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.isValid = !this.validateInequalityViolation() && !this.validateSidesAreNotZero();
        this._kind = this.isValid ? this.getTriangleKind() : "scalene";
    }
    get isEquilateral() {
        return this._kind === "equilateral";
    }
    get isIsosceles() {
        return this._kind === "isosceles" || this._kind === "equilateral";
    }
    get isScalene() {
        return this._kind === 'scalene';
    }
    kind(triangleKind) {
        return this.isValid && this._kind === triangleKind;
    }
    getTriangleKind() {
        if (this.a === this.b && this.b === this.c) {
            return "equilateral";
        }
        if (this.a !== this.b && this.a !== this.c && this.b !== this.c) {
            return "scalene";
        }
        return "isosceles";
    }
    validateInequalityViolation() {
        return this.a + this.b <= this.c || this.b + this.c <= this.a || this.c + this.a <= this.b;
    }
    validateSidesAreNotZero() {
        return this.a <= 0 || this.b <= 0 || this.c <= 0;
    }
}
exports.Triangle = Triangle;
