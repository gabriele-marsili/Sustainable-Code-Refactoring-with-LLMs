"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this._kind = null;
        this._isValid = null;
    }
    get isEquilateral() {
        return this.getKind() === "equilateral";
    }
    get isIsosceles() {
        const triangleKind = this.getKind();
        return triangleKind === "isosceles" || triangleKind === "equilateral";
    }
    get isScalene() {
        return this.getKind() === "scalene";
    }
    kind(triangleKind) {
        return this.isValidTriangle() && this.getKind() === triangleKind;
    }
    getKind() {
        if (this._kind === null) {
            this._kind = this.calculateKind();
        }
        return this._kind;
    }
    calculateKind() {
        if (this.a === this.b && this.b === this.c)
            return "equilateral";
        if (this.a !== this.b && this.a !== this.c && this.b !== this.c)
            return "scalene";
        return "isosceles";
    }
    isValidTriangle() {
        if (this._isValid === null) {
            this._isValid = this.a > 0 && this.b > 0 && this.c > 0 &&
                this.a + this.b > this.c &&
                this.b + this.c > this.a &&
                this.c + this.a > this.b;
        }
        return this._isValid;
    }
}
exports.Triangle = Triangle;
