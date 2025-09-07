export default class ComplexNumber {
    constructor(public real: number, public imag: number) {}

    add(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    }

    sub(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    }

    mul(other: ComplexNumber): ComplexNumber {
        const real = this.real * other.real - this.imag * other.imag;
        const imag = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(real, imag);
    }

    div(other: ComplexNumber): ComplexNumber {
        const divisor = other.real * other.real + other.imag * other.imag;
        const real = (this.real * other.real + this.imag * other.imag) / divisor;
        const imag = (this.imag * other.real - this.real * other.imag) / divisor;
        return new ComplexNumber(real, imag);
    }

    get abs(): number {
        return Math.hypot(this.real, this.imag);
    }

    get conj(): ComplexNumber {
        return new ComplexNumber(this.real, -this.imag);
    }

    get exp(): ComplexNumber {
        const expReal = Math.exp(this.real);
        return new ComplexNumber(expReal * Math.cos(this.imag), expReal * Math.sin(this.imag));
    }
}