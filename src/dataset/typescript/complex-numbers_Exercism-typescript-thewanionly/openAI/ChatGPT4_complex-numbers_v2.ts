export class ComplexNumber {
  constructor(public real: number, public imag: number) {}

  public add({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + real, this.imag + imag);
  }

  public sub({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - real, this.imag - imag);
  }

  public div({ real, imag }: ComplexNumber): ComplexNumber {
    const denominator = real * real + imag * imag;
    return new ComplexNumber(
      (this.real * real + this.imag * imag) / denominator,
      (this.imag * real - this.real * imag) / denominator
    );
  }

  public mul({ real, imag }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real * real - this.imag * imag,
      this.imag * real + this.real * imag
    );
  }

  public get abs(): number {
    return Math.hypot(this.real, this.imag);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, -this.imag);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.real);
    return new ComplexNumber(
      expReal * Math.cos(this.imag),
      expReal * Math.sin(this.imag)
    );
  }
}