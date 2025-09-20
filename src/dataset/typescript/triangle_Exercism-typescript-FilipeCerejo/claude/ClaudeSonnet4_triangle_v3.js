"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
    }
    get isEquilateral() {
        if (this._isEquilateral === undefined) {
            this.calculateTriangleType();
        }
        return this._isTriangle && this._isEquilateral;
    }
    get isIsosceles() {
        if (this._isIsosceles === undefined) {
            this.calculateTriangleType();
        }
        return this._isTriangle && this._isIsosceles;
    }
    get isScalene() {
        if (this._isScalene === undefined) {
            this.calculateTriangleType();
        }
        return this._isTriangle && this._isScalene;
    }
    calculateTriangleType() {
        this._isTriangle = this._a > 0 && this._b > 0 && this._c > 0
            && this._a + this._b > this._c
            && this._b + this._c > this._a
            && this._a + this._c > this._b;
        if (!this._isTriangle) {
            this._isEquilateral = false;
            this._isIsosceles = false;
            this._isScalene = false;
            return;
        }
        const aEqualsB = this._a === this._b;
        const bEqualsC = this._b === this._c;
        const cEqualsA = this._c === this._a;
        this._isEquilateral = aEqualsB && bEqualsC;
        this._isIsosceles = aEqualsB || bEqualsC || cEqualsA;
        this._isScalene = !this._isIsosceles;
    }
}
exports.Triangle = Triangle;
