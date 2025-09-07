export class ComplexNumber {
  constructor(public real: number, public imag: number) {}

  public add(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + complexNumber.real, this.imag + complexNumber.imag);
  }

  public sub(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - complexNumber.real, this.imag - complexNumber.imag);
  }

  public div(complexNumber: ComplexNumber): ComplexNumber {
    const denominator = complexNumber.real ** 2 + complexNumber.imag ** 2;
    const real = (this.real * complexNumber.real + this.imag * complexNumber.imag) / denominator;
    const imaginary = (this.imag * complexNumber.real - this.real * complexNumber.imag) / denominator;

    return new ComplexNumber(real, imaginary);
  }

  public mul(complexNumber: ComplexNumber): ComplexNumber {
    const real = this.real * complexNumber.real - this.imag * complexNumber.imag;
    const imaginary = this.imag * complexNumber.real + this.real * complexNumber.imag;

    return new ComplexNumber(real, imaginary);
  }

  public get abs(): number {
    return Math.hypot(this.real, this.imag);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, -this.imag);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.real);
    const real = expReal * Math.cos(this.imag);
    const imaginary = expReal * Math.sin(this.imag);
    return new ComplexNumber(real, imaginary);
  }
}