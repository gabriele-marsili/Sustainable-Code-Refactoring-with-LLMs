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
    const denom = real * real + imag * imag;
    const realPart = (this.realPart * real + this.imaginaryPart * imag) / denom;
    const imaginaryPart = (this.imaginaryPart * real - this.realPart * imag) / denom;
    return new ComplexNumber(realPart, imaginaryPart);
  }

  public mul({ real, imag }: ComplexNumber): ComplexNumber {
    const realPart = this.realPart * real - this.imaginaryPart * imag;
    const imaginaryPart = this.imaginaryPart * real + this.realPart * imag;
    return new ComplexNumber(realPart, imaginaryPart);
  }

  public get abs(): number {
    return Math.hypot(this.realPart, this.imaginaryPart);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, -this.imaginaryPart);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart);
    return new ComplexNumber(expReal * Math.cos(this.imaginaryPart), expReal * Math.sin(this.imaginaryPart));
  }
}