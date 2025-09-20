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
    add({ realPart, imaginaryPart }) {
        return new ComplexNumber(this.realPart + realPart, this.imaginaryPart + imaginaryPart);
    }
    sub({ realPart, imaginaryPart }) {
        return new ComplexNumber(this.realPart - realPart, this.imaginaryPart - imaginaryPart);
    }
    div({ realPart, imaginaryPart }) {
        const denominator = Math.pow(realPart, 2) + Math.pow(imaginaryPart, 2);
        return new ComplexNumber((this.realPart * realPart + this.imaginaryPart * imaginaryPart) / denominator, (this.imaginaryPart * realPart - this.realPart * imaginaryPart) / denominator);
    }
    mul({ realPart, imaginaryPart }) {
        return new ComplexNumber(this.realPart * realPart - this.imaginaryPart * imaginaryPart, this.imaginaryPart * realPart + this.realPart * imaginaryPart);
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
