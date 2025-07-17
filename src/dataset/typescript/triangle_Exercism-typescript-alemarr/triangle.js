"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    get isEquilateral() {
        return this.kind("equilateral");
    }
    get isIsosceles() {
        return this.kind("isosceles") || this.isEquilateral;
    }
    get isScalene() {
        return this.kind('scalene');
    }
    kind(triangleKind) {
        const equalityValidations = !this.validateInequalityViolation() && !this.validateSidesAreNotZero();
        return equalityValidations && this.getMatchingSides() === triangleKind;
    }
    allSidesAreEqual() {
        return this.a == this.b && this.b == this.c;
    }
    allSidesAreDifferent() {
        return this.a != this.b && this.a != this.c && this.b != this.c;
    }
    getMatchingSides() {
        if (this.allSidesAreEqual())
            return "equilateral";
        if (this.allSidesAreDifferent())
            return "scalene";
        return "isosceles";
    }
    validateInequalityViolation() {
        return this.a + this.b < this.c ||
            this.b + this.c < this.a ||
            this.c + this.a < this.b;
    }
    validateSidesAreNotZero() {
        return this.a == 0 || this.b == 0 || this.c == 0;
    }
}
exports.Triangle = Triangle;
