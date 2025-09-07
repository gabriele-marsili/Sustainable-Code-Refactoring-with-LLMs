export class ComplexNumber {
  constructor(private _r: number, private _i: number) {}

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
    const denom = other._r ** 2 + other._i ** 2;
    const r = (this._r * other._r + this._i * other._i) / denom;
    const i = (this._i * other._r - this._r * other._i) / denom;
    return new ComplexNumber(r, i);
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const r = this._r * other._r - this._i * other._i;
    const i = this._i * other._r + this._r * other._i;
    return new ComplexNumber(r, i);
  }

  public get abs(): number {
    return Math.hypot(this._r, this._i);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this._r, -this._i);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this._r);
    return new ComplexNumber(expReal * Math.cos(this._i), expReal * Math.sin(this._i));
  }
}