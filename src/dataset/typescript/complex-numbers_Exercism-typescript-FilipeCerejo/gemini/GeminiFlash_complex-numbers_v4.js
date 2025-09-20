"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(real, imaginary) {
        this._r = real;
        this._i = imaginary;
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
        const real = other._r;
        const imag = other._i;
        const denominator = real * real + imag * imag;
        const r = (this._r * real + this._i * imag) / denominator;
        const i = (this._i * real - this._r * imag) / denominator;
        return new ComplexNumber(r, i);
    }
    mul(other) {
        const r = this._r * other._r - this._i * other._i;
        const i = this._i * other._r + this._r * other._i;
        return new ComplexNumber(r, i);
    }
    get abs() {
        return Math.sqrt(this._r * this._r + this._i * this._i);
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
