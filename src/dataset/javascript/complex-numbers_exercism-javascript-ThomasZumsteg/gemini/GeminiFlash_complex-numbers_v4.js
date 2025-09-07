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
        const real = other.real;
        const imag = other.imag;
        const denom = real * real + imag * imag;

        if (denom === 0) {
            return new ComplexNumber(NaN, NaN);
        }

        const realNum = this.real * real + this.imag * imag;
        const imagNum = real * this.imag - imag * this.real;
        return new ComplexNumber(realNum / denom, imagNum / denom);
    }

    get abs() {
        const real = this.real;
        const imag = this.imag;
        return Math.hypot(real, imag);
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