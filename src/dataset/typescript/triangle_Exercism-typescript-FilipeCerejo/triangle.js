"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._isTriangle = false;
        this._isEquilateral = false;
        this._isIsosceles = false;
        this._isScalene = false;
        this._a = a;
        this._b = b;
        this._c = c;
        this.calculate();
    }
    get isEquilateral() {
        return this._isTriangle && this._isEquilateral;
    }
    get isIsosceles() {
        return this._isTriangle && this._isIsosceles;
    }
    get isScalene() {
        return this._isTriangle && this._isScalene;
    }
    calculate() {
        this._isTriangle = this._a > 0 && this._b > 0 && this._c > 0
            && this._a + this._b > this._c
            && this._b + this._c > this._a
            && this._a + this._c > this._b;
        this._isEquilateral = this._isTriangle && this._a === this._b && this._b === this._c;
        this._isIsosceles = this._isTriangle && (this._a === this._b || this._b === this._c || this._c === this._a);
        this._isScalene = this._isTriangle && !this._isIsosceles;
    }
}
exports.Triangle = Triangle;
