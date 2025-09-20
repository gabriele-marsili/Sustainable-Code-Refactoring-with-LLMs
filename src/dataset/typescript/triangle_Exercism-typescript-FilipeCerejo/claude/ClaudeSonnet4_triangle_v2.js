"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        // Early validation - fail fast
        if (a <= 0 || b <= 0 || c <= 0) {
            this._isTriangle = false;
            this._isEquilateral = false;
            this._isIsosceles = false;
            this._isScalene = false;
            return;
        }
        // Triangle inequality check
        this._isTriangle = a + b > c && b + c > a && a + c > b;
        if (!this._isTriangle) {
            this._isEquilateral = false;
            this._isIsosceles = false;
            this._isScalene = false;
            return;
        }
        // Calculate triangle types in order of specificity
        this._isEquilateral = a === b && b === c;
        this._isIsosceles = this._isEquilateral || a === b || b === c || c === a;
        this._isScalene = !this._isIsosceles;
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
