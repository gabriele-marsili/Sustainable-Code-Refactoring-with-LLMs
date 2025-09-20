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
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(realPart, imagPart);
    }
    div(other) {
        const otherReal = other.real;
        const otherImag = other.imag;
        const divisor = otherReal * otherReal + otherImag * otherImag;
        if (divisor === 0) {
            return new ComplexNumber(NaN, NaN);
        }
        const realPart = (this.real * otherReal + this.imag * otherImag) / divisor;
        const imagPart = (this.imag * otherReal - this.real * otherImag) / divisor;
        return new ComplexNumber(realPart, imagPart);
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
