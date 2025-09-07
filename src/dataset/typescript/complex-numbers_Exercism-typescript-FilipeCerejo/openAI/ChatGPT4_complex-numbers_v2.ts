export class ComplexNumber {
  constructor(private _r: number, private _i: number) {}

  public get real(): number {
    return this._r;
  }

  public get imag(): number {
    return this._i;
  }

  public add({ _r, _i }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r + _r, this._i + _i);
  }

  public sub({ _r, _i }: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._r - _r, this._i - _i);
  }

  public div({ _r, _i }: ComplexNumber): ComplexNumber {
    const denom = _r ** 2 + _i ** 2;
    const r = (this._r * _r + this._i * _i) / denom;
    const i = (this._i * _r - this._r * _i) / denom;
    return new ComplexNumber(r, i);
  }

  public mul({ _r, _i }: ComplexNumber): ComplexNumber {
    const r = this._r * _r - this._i * _i;
    const i = this._i * _r + this._r * _i;
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