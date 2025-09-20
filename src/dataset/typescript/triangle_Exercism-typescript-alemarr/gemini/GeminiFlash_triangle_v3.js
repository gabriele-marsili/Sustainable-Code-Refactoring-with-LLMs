"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this._kind = null;
        this.isValid = null;
        if (a <= 0 || b <= 0 || c <= 0) {
            this.isValid = false;
            return;
        }
        if (a + b <= c || a + c <= b || b + c <= a) {
            this.isValid = false;
            return;
        }
        this.isValid = true;
        if (a === b && b === c) {
            this._kind = "equilateral";
        }
        else if (a !== b && a !== c && b !== c) {
            this._kind = "scalene";
        }
        else {
            this._kind = "isosceles";
        }
    }
    get isEquilateral() {
        return this._kind === "equilateral" && this.isValid === true;
    }
    get isIsosceles() {
        return (this._kind === "isosceles" || this._kind === "equilateral") && this.isValid === true;
    }
    get isScalene() {
        return this._kind === "scalene" && this.isValid === true;
    }
    kind(triangleKind) {
        if (this.isValid === false)
            return false;
        if (triangleKind === "equilateral") {
            return this._kind === "equilateral";
        }
        else if (triangleKind === "isosceles") {
            return this._kind === "isosceles";
        }
        else {
            return this._kind === "scalene";
        }
    }
}
exports.Triangle = Triangle;
