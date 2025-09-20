export default class ComplexNumber {
    real: number;
    imag: number;

    constructor(real: number, imag: number) {
        this.real = real;
        this.imag = imag;
    }

    add(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    }

    sub(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    }

    mul(other: ComplexNumber): ComplexNumber {
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(realPart, imagPart);
    }

    div(other: ComplexNumber): ComplexNumber {
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

    get abs(): number {
        return Math.hypot(this.real, this.imag);
    }

    get conj(): ComplexNumber {
        return new ComplexNumber(this.real, -this.imag);
    }

    get exp(): ComplexNumber {
        const expReal = Math.exp(this.real);
        return new ComplexNumber(
            expReal * Math.cos(this.imag),
            expReal * Math.sin(this.imag)
        );
    }
}