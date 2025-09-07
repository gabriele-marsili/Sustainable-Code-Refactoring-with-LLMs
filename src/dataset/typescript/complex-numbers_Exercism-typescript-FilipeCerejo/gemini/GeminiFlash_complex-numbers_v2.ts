export class ComplexNumber {

  private readonly _r: number;
  private readonly _i: number;

  constructor(real: number, imaginary: number) {
    this._r = real;
    this._i = imaginary;
  }

  get real(): number {
    return this._r;
  }

  get imag(): number {
    return this._i;
  }

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r + other._r, this._i + other._i);
  }

  sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r - other._r, this._i - other._i);
  }

  div(other: ComplexNumber): ComplexNumber {
    const real = other._r;
    const imag = other._i;
    const denominator = real * real + imag * imag;

    const r = (this._r * real + this._i * imag) / denominator;
    const i = (this._i * real - this._r * imag) / denominator;

    return new ComplexNumber(r, i);
  }

  mul(other: ComplexNumber): ComplexNumber {
    const r = this._r * other._r - this._i * other._i;
    const i = this._i * other._r + this._r * other._i;
    return new ComplexNumber(r, i);
  }

  get abs(): number {
    return Math.hypot(this._r, this._i);
  }

  get conj(): ComplexNumber {
    return new ComplexNumber(this._r, -this._i);
  }

  get exp(): ComplexNumber {
    const expReal = Math.exp(this._r);
    return new ComplexNumber(expReal * Math.cos(this._i), expReal * Math.sin(this._i));
  }
}