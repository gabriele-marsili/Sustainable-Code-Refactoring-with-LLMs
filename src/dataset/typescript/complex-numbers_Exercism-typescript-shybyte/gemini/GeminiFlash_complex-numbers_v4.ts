export default class ComplexNumber {
    real: number;
    imag: number;

    constructor(real: number, imag: number) {
        this.real = real;
        this.imag = imag;
    }

    add(other: ComplexNumber) {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    }

    sub(other: ComplexNumber) {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    }

    mul(other: ComplexNumber) {
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(realPart, imagPart);
    }

    div(other: ComplexNumber) {
        const divisor = other.real * other.real + other.imag * other.imag;
        const realPart = (this.real * other.real + this.imag * other.imag) / divisor;
        const imagPart = (this.imag * other.real - this.real * other.imag) / divisor;
        return new ComplexNumber(realPart, imagPart);
    }

    get abs() {
        const real = this.real;
        const imag = this.imag;
        return Math.sqrt(real * real + imag * imag);
    }

    get conj() {
        return new ComplexNumber(this.real, -this.imag);
    }

    get exp() {
        const expReal = Math.exp(this.real);
        return new ComplexNumber(
            expReal * Math.cos(this.imag),
            expReal * Math.sin(this.imag)
        );
    }
}