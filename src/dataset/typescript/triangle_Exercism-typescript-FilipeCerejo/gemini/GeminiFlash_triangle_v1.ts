export class Triangle {

  private readonly _a: number;
  private readonly _b: number;
  private readonly _c: number;

  private _type: 'equilateral' | 'isosceles' | 'scalene' | 'none';

  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;

    this._type = this.calculateType();
  }

  private calculateType(): 'equilateral' | 'isosceles' | 'scalene' | 'none' {
    if (this._a <= 0 || this._b <= 0 || this._c <= 0 ||
      this._a + this._b <= this._c ||
      this._b + this._c <= this._a ||
      this._a + this._c <= this._b) {
      return 'none';
    }

    if (this._a === this._b && this._b === this._c) {
      return 'equilateral';
    }

    if (this._a === this._b || this._b === this._c || this._c === this._a) {
      return 'isosceles';
    }

    return 'scalene';
  }

  get isEquilateral(): boolean {
    return this._type === 'equilateral';
  }

  get isIsosceles(): boolean {
    return this._type === 'isosceles';
  }

  get isScalene(): boolean {
    return this._type === 'scalene';
  }
}