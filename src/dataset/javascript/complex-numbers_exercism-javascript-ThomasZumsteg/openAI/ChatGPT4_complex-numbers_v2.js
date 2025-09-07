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

    mul({ real, imag }) {
        const realPart = this.real * real - this.imag * imag;
        const imagPart = this.real * imag + this.imag * real;
        return new ComplexNumber(realPart, imagPart);
    }

    div({ real, imag }) {
        const denom = real * real + imag * imag;
        const realPart = (this.real * real + this.imag * imag) / denom;
        const imagPart = (this.imag * real - this.real * imag) / denom;
        return new ComplexNumber(realPart, imagPart);
    }

    get abs() {
        return Math.hypot(this.real, this.imag);
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

export default ComplexNumber;