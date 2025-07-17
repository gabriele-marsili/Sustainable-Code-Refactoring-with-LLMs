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
        return new ComplexNumber(this.real * other.real - this.imag * other.imag, this.real * other.imag + this.imag * other.real);
    }
    div(other) {
        const divisor = other.real * other.real + other.imag * other.imag;
        return new ComplexNumber((this.real * other.real + this.imag * other.imag) / divisor, (this.imag * other.real - this.real * other.imag) / divisor);
    }
    get abs() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
    get conj() {
        return new ComplexNumber(this.real, 0 - this.imag);
    }
    get exp() {
        return new ComplexNumber(Math.exp(this.real) * Math.cos(this.imag), Math.exp(this.real) * Math.sin(this.imag));
    }
}
exports.default = ComplexNumber;
