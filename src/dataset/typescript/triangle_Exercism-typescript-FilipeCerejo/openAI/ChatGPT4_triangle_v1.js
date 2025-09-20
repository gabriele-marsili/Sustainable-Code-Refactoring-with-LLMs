"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
        const isPositive = a > 0 && b > 0 && c > 0;
        const satisfiesTriangleInequality = a + b > c && b + c > a && a + c > b;
        this._isTriangle = isPositive && satisfiesTriangleInequality;
        this._isEquilateral = this._isTriangle && a === b && b === c;
        this._isIsosceles = this._isTriangle && (a === b || b === c || c === a);
        this._isScalene = this._isTriangle && !this._isIsosceles;
    }
    get isEquilateral() {
        return this._isEquilateral;
    }
    get isIsosceles() {
        return this._isIsosceles;
    }
    get isScalene() {
        return this._isScalene;
    }
}
exports.Triangle = Triangle;
