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
        const real = this.real * other.real - this.imag * other.imag;
        const imag = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(real, imag);
    }

    div(other) {
        const denom = other.real * other.real + other.imag * other.imag;
        const real = (this.real * other.real + this.imag * other.imag) / denom;
        const imag = (other.real * this.imag - other.imag * this.real) / denom;
        return new ComplexNumber(real, imag);
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
        const real = expReal * Math.cos(this.imag);
        const imag = expReal * Math.sin(this.imag);
        return new ComplexNumber(real, imag);
    }
}

export default ComplexNumber;