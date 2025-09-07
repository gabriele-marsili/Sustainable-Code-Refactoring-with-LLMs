export class ComplexNumber {
  constructor(public realPart: number, public imaginaryPart: number) {}

  public get real(): number {
    return this.realPart
  }

  public get imag(): number {
    return this.imaginaryPart
  }

  public add({ realPart, imaginaryPart }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart + realPart, this.imaginaryPart + imaginaryPart)
  }

  public sub({ realPart, imaginaryPart }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart - realPart, this.imaginaryPart - imaginaryPart)
  }

  public div({ realPart, imaginaryPart }: ComplexNumber): ComplexNumber {
    const denominator = realPart ** 2 + imaginaryPart ** 2
    return new ComplexNumber(
      (this.realPart * realPart + this.imaginaryPart * imaginaryPart) / denominator,
      (this.imaginaryPart * realPart - this.realPart * imaginaryPart) / denominator
    )
  }

  public mul({ realPart, imaginaryPart }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.realPart * realPart - this.imaginaryPart * imaginaryPart,
      this.imaginaryPart * realPart + this.realPart * imaginaryPart
    )
  }

  public get abs(): number {
    return Math.hypot(this.realPart, this.imaginaryPart)
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, -this.imaginaryPart)
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart)
    return new ComplexNumber(expReal * Math.cos(this.imaginaryPart), expReal * Math.sin(this.imaginaryPart))
  }
}