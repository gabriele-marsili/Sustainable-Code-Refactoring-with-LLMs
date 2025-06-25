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
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  public div(other: ComplexNumber): ComplexNumber {
    let r = (this.real * other.real + this.imag * other.imag) / (other.real ** 2 + other.imag ** 2);

    let i = (this.imag * other.real - this.real * other.imag) /
     (other.real ** 2 + other.imag ** 2);

    return new ComplexNumber(r, i);
  }

  public mul(other: ComplexNumber): ComplexNumber {
    let r = this.real * other.real - this.imag * other.imag;
    let i = this.imag * other.real + this.real * other.imag;
    return new ComplexNumber(r, i);
  }

  public get abs(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, this.imag ? -this.imag : 0);
  }

  public get exp(): ComplexNumber {
    console.log('Math.exp(this.real)', Math.exp(this.real))
    return new ComplexNumber(Math.exp(this.real) * Math.cos(this.imag), Math.exp(this.real) * Math.sin(this.imag));
  }
}
