export class ComplexNumber {
  private readonly realPart: number;
  private readonly imaginaryPart: number;

  constructor(real: number, imaginary: number) {
    this.realPart = real;
    this.imaginaryPart = imaginary;
  }

  get real(): number {
    return this.realPart;
  }

  get imag(): number {
    return this.imaginaryPart;
  }

  add(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart + complexNumber.realPart, this.imaginaryPart + complexNumber.imaginaryPart);
  }

  sub(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart - complexNumber.realPart, this.imaginaryPart - complexNumber.imaginaryPart);
  }

  div(complexNumber: ComplexNumber): ComplexNumber {
    const denominator = complexNumber.realPart * complexNumber.realPart + complexNumber.imaginaryPart * complexNumber.imaginaryPart;
    const real = (this.realPart * complexNumber.realPart + this.imaginaryPart * complexNumber.imaginaryPart) / denominator;
    const imaginary = (this.imaginaryPart * complexNumber.realPart - this.realPart * complexNumber.imaginaryPart) / denominator;
    return new ComplexNumber(real, imaginary);
  }

  mul(complexNumber: ComplexNumber): ComplexNumber {
    const real = this.realPart * complexNumber.realPart - this.imaginaryPart * complexNumber.imaginaryPart;
    const imaginary = this.imaginaryPart * complexNumber.realPart + this.realPart * complexNumber.imaginaryPart;
    return new ComplexNumber(real, imaginary);
  }

  get abs(): number {
    return Math.sqrt(this.realPart * this.realPart + this.imaginaryPart * this.imaginaryPart);
  }

  get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, -this.imaginaryPart);
  }

  get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart);
    const real = expReal * Math.cos(this.imaginaryPart);
    const imaginary = expReal * Math.sin(this.imaginaryPart);
    return new ComplexNumber(real, imaginary);
  }
}