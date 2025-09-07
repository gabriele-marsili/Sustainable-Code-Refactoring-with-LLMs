export default class ComplexNumber {
    constructor(public real: number, public imag: number) {}

    add(other: ComplexNumber) {
        const { real, imag } = other;
        return new ComplexNumber(this.real + real, this.imag + imag);
    }

    sub(other: ComplexNumber) {
        const { real, imag } = other;
        return new ComplexNumber(this.real - real, this.imag - imag);
    }

    mul(other: ComplexNumber) {
        const { real, imag } = other;
        const r = this.real * real - this.imag * imag;
        const i = this.real * imag + this.imag * real;
        return new ComplexNumber(r, i);
    }

    div(other: ComplexNumber) {
        const { real, imag } = other;
        const divisor = real * real + imag * imag;
        const r = (this.real * real + this.imag * imag) / divisor;
        const i = (this.imag * real - this.real * imag) / divisor;
        return new ComplexNumber(r, i);
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