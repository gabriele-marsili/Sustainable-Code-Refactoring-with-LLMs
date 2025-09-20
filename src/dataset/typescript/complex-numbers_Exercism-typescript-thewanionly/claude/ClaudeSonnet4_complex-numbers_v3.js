"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(realPart, imaginaryPart) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }
    get real() {
        return this.realPart;
    }
    get imag() {
        return this.imaginaryPart;
    }
    add(complexNumber) {
        return new ComplexNumber(this.realPart + complexNumber.realPart, this.imaginaryPart + complexNumber.imaginaryPart);
    }
    sub(complexNumber) {
        return new ComplexNumber(this.realPart - complexNumber.realPart, this.imaginaryPart - complexNumber.imaginaryPart);
    }
    div(complexNumber) {
        const denominator = complexNumber.realPart * complexNumber.realPart +
            complexNumber.imaginaryPart * complexNumber.imaginaryPart;
        return new ComplexNumber((this.realPart * complexNumber.realPart + this.imaginaryPart * complexNumber.imaginaryPart) / denominator, (this.imaginaryPart * complexNumber.realPart - this.realPart * complexNumber.imaginaryPart) / denominator);
    }
    mul(complexNumber) {
        return new ComplexNumber(this.realPart * complexNumber.realPart - this.imaginaryPart * complexNumber.imaginaryPart, this.imaginaryPart * complexNumber.realPart + this.realPart * complexNumber.imaginaryPart);
    }
    get abs() {
        return Math.hypot(this.realPart, this.imaginaryPart);
    }
    get conj() {
        return new ComplexNumber(this.realPart, -this.imaginaryPart);
    }
    get exp() {
        const expReal = Math.exp(this.realPart);
        return new ComplexNumber(expReal * Math.cos(this.imaginaryPart), expReal * Math.sin(this.imaginaryPart));
    }
}
exports.ComplexNumber = ComplexNumber;
