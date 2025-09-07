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
        return Math.hypot(this.real, this.imag);
    }

    get conj() {
        return new ComplexNumber(this.real, -this.imag);
    }

    get exp() {
        const expReal = Math.exp(this.real);
        const cosImag = Math.cos(this.imag);
        const sinImag = Math.sin(this.imag);
        return new ComplexNumber(expReal * cosImag, expReal * sinImag);
    }
}

export default ComplexNumber;