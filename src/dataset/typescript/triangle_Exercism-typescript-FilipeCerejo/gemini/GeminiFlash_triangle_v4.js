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
        const a = this._a;
        const b = this._b;
        const c = this._c;
        if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || b + c <= a || a + c <= b) {
            return;
        }
        this._isTriangle = true;
        if (a === b && b === c) {
            this._isEquilateral = true;
        }
        else if (a === b || b === c || c === a) {
            this._isIsosceles = true;
        }
        else {
            this._isScalene = true;
        }
    }
}
exports.Triangle = Triangle;
