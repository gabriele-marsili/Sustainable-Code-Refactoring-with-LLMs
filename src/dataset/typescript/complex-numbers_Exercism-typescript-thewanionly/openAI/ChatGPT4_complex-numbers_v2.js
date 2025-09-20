"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }
    add({ real, imag }) {
        return new ComplexNumber(this.real + real, this.imag + imag);
    }
    sub({ real, imag }) {
        return new ComplexNumber(this.real - real, this.imag - imag);
    }
    div({ real, imag }) {
        const denominator = real * real + imag * imag;
        return new ComplexNumber((this.real * real + this.imag * imag) / denominator, (this.imag * real - this.real * imag) / denominator);
    }
    mul({ real, imag }) {
        return new ComplexNumber(this.real * real - this.imag * imag, this.imag * real + this.real * imag);
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
exports.ComplexNumber = ComplexNumber;
