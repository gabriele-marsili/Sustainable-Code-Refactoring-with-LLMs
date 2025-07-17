"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(real, imaginary) {
        this.realPart = real;
        this.imaginaryPart = imaginary;
    }
    get real() {
        return this.realPart;
    }
    get imag() {
        return this.imaginaryPart;
    }
    add(complexNumber) {
        const real = this.real + complexNumber.real;
        const imaginary = this.imag + complexNumber.imag;
        return new ComplexNumber(real, imaginary);
    }
    sub(complexNumber) {
        const real = this.real - complexNumber.real;
        const imaginary = this.imag - complexNumber.imag;
        return new ComplexNumber(real, imaginary);
    }
    div(complexNumber) {
        const real = (this.real * complexNumber.real + this.imag * complexNumber.imag) /
            (Math.pow(complexNumber.real, 2) + Math.pow(complexNumber.imag, 2));
        const imaginary = (this.imag * complexNumber.real - this.real * complexNumber.imag) /
            (Math.pow(complexNumber.real, 2) + Math.pow(complexNumber.imag, 2));
        return new ComplexNumber(real, imaginary);
    }
    mul(complexNumber) {
        const real = this.real * complexNumber.real - this.imag * complexNumber.imag;
        const imaginary = this.imag * complexNumber.real + this.real * complexNumber.imag;
        return new ComplexNumber(real, imaginary);
    }
    get abs() {
        return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imag, 2));
    }
    get conj() {
        return new ComplexNumber(this.real, this.imag > 0 ? -this.imag : 0);
    }
    get exp() {
        const real = Math.pow(Math.E, this.real) * Math.cos(this.imag);
        const imaginary = Math.pow(Math.E, this.real) * Math.sin(this.imag);
        return new ComplexNumber(real, imaginary);
    }
}
exports.ComplexNumber = ComplexNumber;
