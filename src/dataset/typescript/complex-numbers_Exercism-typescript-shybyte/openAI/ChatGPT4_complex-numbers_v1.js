"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComplexNumber {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }
    add(other) {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    }
    sub(other) {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    }
    mul(other) {
        const real = this.real * other.real - this.imag * other.imag;
        const imag = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(real, imag);
    }
    div(other) {
        const divisor = other.real * other.real + other.imag * other.imag;
        const real = (this.real * other.real + this.imag * other.imag) / divisor;
        const imag = (this.imag * other.real - this.real * other.imag) / divisor;
        return new ComplexNumber(real, imag);
    }
    get abs() {
        return Math.hypot(this.real, this.imag);
    }
    get conj() {
        return new ComplexNumber(this.real, -this.imag);
    }
    get exp() {
        const expReal = Math.exp(this.real);
        return new ComplexNumber(expReal * Math.cos(this.imag), expReal * Math.sin(this.imag));
    }
}
exports.default = ComplexNumber;
