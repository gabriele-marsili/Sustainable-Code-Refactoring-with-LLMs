"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
        const isValidTriangle = a > 0 && b > 0 && c > 0
            && a + b > c
            && b + c > a
            && a + c > b;
        this._isTriangle = isValidTriangle;
        this._isEquilateral = isValidTriangle && a === b && b === c;
        this._isIsosceles = isValidTriangle && (a === b || b === c || c === a);
        this._isScalene = isValidTriangle && !(a === b || b === c || c === a);
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
