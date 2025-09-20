"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }
    add(complexNumber) {
        return new ComplexNumber(this.real + complexNumber.real, this.imag + complexNumber.imag);
    }
    sub(complexNumber) {
        return new ComplexNumber(this.real - complexNumber.real, this.imag - complexNumber.imag);
    }
    div(complexNumber) {
        const denominator = Math.pow(complexNumber.real, 2) + Math.pow(complexNumber.imag, 2);
        const real = (this.real * complexNumber.real + this.imag * complexNumber.imag) / denominator;
        const imaginary = (this.imag * complexNumber.real - this.real * complexNumber.imag) / denominator;
        return new ComplexNumber(real, imaginary);
    }
    mul(complexNumber) {
        const real = this.real * complexNumber.real - this.imag * complexNumber.imag;
        const imaginary = this.imag * complexNumber.real + this.real * complexNumber.imag;
        return new ComplexNumber(real, imaginary);
    }
    get abs() {
        return Math.hypot(this.real, this.imag);
    }
    get conj() {
        return new ComplexNumber(this.real, -this.imag);
    }
    get exp() {
        const expReal = Math.exp(this.real);
        const real = expReal * Math.cos(this.imag);
        const imaginary = expReal * Math.sin(this.imag);
        return new ComplexNumber(real, imaginary);
    }
}
exports.ComplexNumber = ComplexNumber;
