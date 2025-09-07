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
        const denominator = other.real * other.real + other.imag * other.imag;
        const real = (this.real * other.real + this.imag * other.imag) / denominator;
        const imag = (this.imag * other.real - this.real * other.imag) / denominator;
        return new ComplexNumber(real, imag);
    }

    abs() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    conj() {
        return new ComplexNumber(this.real, -this.imag);
    }

    exp() {
        const expReal = Math.exp(this.real);
        const real = expReal * Math.cos(this.imag);
        const imag = expReal * Math.sin(this.imag);
        return new ComplexNumber(real, imag);
    }
}

export default ComplexNumber;