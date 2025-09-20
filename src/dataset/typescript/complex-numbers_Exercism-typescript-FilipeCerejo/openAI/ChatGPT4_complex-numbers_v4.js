"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(_r, _i) {
        this._r = _r;
        this._i = _i;
    }
    get real() {
        return this._r;
    }
    get imag() {
        return this._i;
    }
    add(other) {
        return new ComplexNumber(this._r + other._r, this._i + other._i);
    }
    sub(other) {
        return new ComplexNumber(this._r - other._r, this._i - other._i);
    }
    div(other) {
        const denom = Math.pow(other._r, 2) + Math.pow(other._i, 2);
        const r = (this._r * other._r + this._i * other._i) / denom;
        const i = (this._i * other._r - this._r * other._i) / denom;
        return new ComplexNumber(r, i);
    }
    mul(other) {
        const r = this._r * other._r - this._i * other._i;
        const i = this._i * other._r + this._r * other._i;
        return new ComplexNumber(r, i);
    }
    get abs() {
        return Math.hypot(this._r, this._i);
    }
    get conj() {
        return new ComplexNumber(this._r, -this._i);
    }
    get exp() {
        const expReal = Math.exp(this._r);
        return new ComplexNumber(expReal * Math.cos(this._i), expReal * Math.sin(this._i));
    }
}
exports.ComplexNumber = ComplexNumber;
