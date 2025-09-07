export class ComplexNumber {
  constructor(public realPart: number, public imaginaryPart: number) {}

  public get real(): number {
    return this.realPart;
  }

  public get imag(): number {
    return this.imaginaryPart;
  }

  public add({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart + real, this.imaginaryPart + imag);
  }

  public sub({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart - real, this.imaginaryPart - imag);
  }

  public div({ real, imag }: ComplexNumber): ComplexNumber {
    const denominator = real ** 2 + imag ** 2;
    return new ComplexNumber(
      (this.realPart * real + this.imaginaryPart * imag) / denominator,
      (this.imaginaryPart * real - this.realPart * imag) / denominator
    );
  }

  public mul({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.realPart * real - this.imaginaryPart * imag,
      this.imaginaryPart * real + this.realPart * imag
    );
  }

  public get abs(): number {
    return Math.hypot(this.realPart, this.imaginaryPart);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, -this.imaginaryPart);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart);
    return new ComplexNumber(
      expReal * Math.cos(this.imaginaryPart),
      expReal * Math.sin(this.imaginaryPart)
    );
  }
}