"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(_a, _b, _c) {
        this._a = _a;
        this._b = _b;
        this._c = _c;
        const isValid = _a > 0 && _b > 0 && _c > 0
            && _a + _b > _c
            && _b + _c > _a
            && _a + _c > _b;
        this._isTriangle = isValid;
        this._isEquilateral = isValid && _a === _b && _b === _c;
        this._isIsosceles = isValid && (_a === _b || _b === _c || _c === _a);
        this._isScalene = isValid && !this._isIsosceles;
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
