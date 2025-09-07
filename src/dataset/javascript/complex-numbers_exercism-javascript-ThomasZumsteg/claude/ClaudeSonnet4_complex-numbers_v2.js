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
        return new ComplexNumber(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real);
    }

    div(other) {
        const denom = other.real * other.real + other.imag * other.imag;
        const realNum = this.real * other.real + this.imag * other.imag;
        const imagNum = other.real * this.imag - other.imag * this.real;
        return new ComplexNumber(realNum / denom, imagNum / denom);
    }

    get abs() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    get conj() {
        return new ComplexNumber(this.real, -this.imag);
    }

    get exp() {
        const expReal = Math.exp(this.real);
        return new ComplexNumber(
            expReal * Math.cos(this.imag),
            expReal * Math.sin(this.imag));
    }
}

export default ComplexNumber;