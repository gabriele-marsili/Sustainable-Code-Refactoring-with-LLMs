"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._isTriangle = false;
        this._isEquilateral = false;
        this._isIsosceles = false;
        this._isScalene = false;
        this.calculate();
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
    calculate() {
        if (this._a <= 0 || this._b <= 0 || this._c <= 0) {
            this._isTriangle = false;
            return;
        }
        this._isTriangle = (this._a + this._b > this._c) && (this._b + this._c > this._a) && (this._a + this._c > this._b);
        if (!this._isTriangle) {
            return;
        }
        if (this._a === this._b && this._b === this._c) {
            this._isEquilateral = true;
        }
        else if (this._a === this._b || this._b === this._c || this._a === this._c) {
            this._isIsosceles = true;
        }
        else {
            this._isScalene = true;
        }
    }
}
exports.Triangle = Triangle;
