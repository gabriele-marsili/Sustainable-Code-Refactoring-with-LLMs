"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._isTriangle = a > 0 && b > 0 && c > 0
            && a + b > c
            && b + c > a
            && a + c > b;
        if (this._isTriangle) {
            this._isEquilateral = a === b && b === c;
            this._isIsosceles = a === b || b === c || c === a;
            this._isScalene = !this._isIsosceles;
        }
        else {
            this._isEquilateral = false;
            this._isIsosceles = false;
            this._isScalene = false;
        }
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
