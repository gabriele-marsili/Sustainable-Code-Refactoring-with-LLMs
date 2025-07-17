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
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    }
    sub(other) {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    }
    div(other) {
        let r = (this.real * other.real + this.imag * other.imag) / (Math.pow(other.real, 2) + Math.pow(other.imag, 2));
        let i = (this.imag * other.real - this.real * other.imag) /
            (Math.pow(other.real, 2) + Math.pow(other.imag, 2));
        return new ComplexNumber(r, i);
    }
    mul(other) {
        let r = this.real * other.real - this.imag * other.imag;
        let i = this.imag * other.real + this.real * other.imag;
        return new ComplexNumber(r, i);
    }
    get abs() {
        return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imag, 2));
    }
    get conj() {
        return new ComplexNumber(this.real, this.imag ? -this.imag : 0);
    }
    get exp() {
        console.log('Math.exp(this.real)', Math.exp(this.real));
        return new ComplexNumber(Math.exp(this.real) * Math.cos(this.imag), Math.exp(this.real) * Math.sin(this.imag));
    }
}
exports.ComplexNumber = ComplexNumber;
