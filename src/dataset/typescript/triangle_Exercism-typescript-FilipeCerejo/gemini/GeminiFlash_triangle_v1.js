"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._type = this.calculateType();
    }
    calculateType() {
        if (this._a <= 0 || this._b <= 0 || this._c <= 0 ||
            this._a + this._b <= this._c ||
            this._b + this._c <= this._a ||
            this._a + this._c <= this._b) {
            return 'none';
        }
        if (this._a === this._b && this._b === this._c) {
            return 'equilateral';
        }
        if (this._a === this._b || this._b === this._c || this._c === this._a) {
            return 'isosceles';
        }
        return 'scalene';
    }
    get isEquilateral() {
        return this._type === 'equilateral';
    }
    get isIsosceles() {
        return this._type === 'isosceles';
    }
    get isScalene() {
        return this._type === 'scalene';
    }
}
exports.Triangle = Triangle;
