export class ComplexNumber {
  realPart: number
  imaginaryPart: number

  constructor(real: number, imaginary: number) {
    this.realPart = real
    this.imaginaryPart = imaginary
  }

  public get real(): number {
    return this.realPart
  }

  public get imag(): number {
    return this.imaginaryPart
  }

  public add(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.realPart + complexNumber.realPart,
      this.imaginaryPart + complexNumber.imaginaryPart
    )
  }

  public sub(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.realPart - complexNumber.realPart,
      this.imaginaryPart - complexNumber.imaginaryPart
    )
  }

  public div(complexNumber: ComplexNumber): ComplexNumber {
    const denominator = complexNumber.realPart * complexNumber.realPart + complexNumber.imaginaryPart * complexNumber.imaginaryPart
    return new ComplexNumber(
      (this.realPart * complexNumber.realPart + this.imaginaryPart * complexNumber.imaginaryPart) / denominator,
      (this.imaginaryPart * complexNumber.realPart - this.realPart * complexNumber.imaginaryPart) / denominator
    )
  }

  public mul(complexNumber: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.realPart * complexNumber.realPart - this.imaginaryPart * complexNumber.imaginaryPart,
      this.imaginaryPart * complexNumber.realPart + this.realPart * complexNumber.imaginaryPart
    )
  }

  public get abs(): number {
    return Math.sqrt(this.realPart * this.realPart + this.imaginaryPart * this.imaginaryPart)
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, -this.imaginaryPart)
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart)
    return new ComplexNumber(
      expReal * Math.cos(this.imaginaryPart),
      expReal * Math.sin(this.imaginaryPart)
    )
  }
}