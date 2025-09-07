export class ComplexNumber {
  private _r: number;
  private _i: number;
  
  constructor(real: number, imaginary: number) {
    this._r = real;
    this._i = imaginary;
  }

  public get real(): number {
    return this._r;
  }

  public get imag(): number {
    return this._i;
  }

  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r + other._r, this._i + other._i);
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r - other._r, this._i - other._i);
  }

  public div(other: ComplexNumber): ComplexNumber {
    const denominator = other._r * other._r + other._i * other._i;
    const r = (this._r * other._r + this._i * other._i) / denominator;
    const i = (this._i * other._r - this._r * other._i) / denominator;
    return new ComplexNumber(r, i);
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const r = this._r * other._r - this._i * other._i;
    const i = this._i * other._r + this._r * other._i;
    return new ComplexNumber(r, i);
  }

  public get abs(): number {
    return Math.sqrt(this._r * this._r + this._i * this._i);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this._r, -this._i);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this._r);
    return new ComplexNumber(expReal * Math.cos(this._i), expReal * Math.sin(this._i));
  }
}