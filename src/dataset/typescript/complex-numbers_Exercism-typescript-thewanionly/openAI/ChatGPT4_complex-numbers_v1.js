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
        const denom = real * real + imag * imag;
        const realPart = (this.realPart * real + this.imaginaryPart * imag) / denom;
        const imaginaryPart = (this.imaginaryPart * real - this.realPart * imag) / denom;
        return new ComplexNumber(realPart, imaginaryPart);
    }
    mul({ real, imag }) {
        const realPart = this.realPart * real - this.imaginaryPart * imag;
        const imaginaryPart = this.imaginaryPart * real + this.realPart * imag;
        return new ComplexNumber(realPart, imaginaryPart);
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
