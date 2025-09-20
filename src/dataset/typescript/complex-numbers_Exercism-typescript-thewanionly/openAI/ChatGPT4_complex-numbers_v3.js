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
    add({ real, imag }) {
        return new ComplexNumber(this.realPart + real, this.imaginaryPart + imag);
    }
    sub({ real, imag }) {
        return new ComplexNumber(this.realPart - real, this.imaginaryPart - imag);
    }
    div({ real, imag }) {
        const denominator = Math.pow(real, 2) + Math.pow(imag, 2);
        return new ComplexNumber((this.realPart * real + this.imaginaryPart * imag) / denominator, (this.imaginaryPart * real - this.realPart * imag) / denominator);
    }
    mul({ real, imag }) {
        return new ComplexNumber(this.realPart * real - this.imaginaryPart * imag, this.imaginaryPart * real + this.realPart * imag);
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
