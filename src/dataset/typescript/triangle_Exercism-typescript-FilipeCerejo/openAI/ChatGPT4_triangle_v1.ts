export class Triangle {
  private _a: number;
  private _b: number;
  private _c: number;

  private _isTriangle: boolean;
  private _isEquilateral: boolean;
  private _isIsosceles: boolean;
  private _isScalene: boolean;

  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;

    const isPositive = a > 0 && b > 0 && c > 0;
    const satisfiesTriangleInequality = a + b > c && b + c > a && a + c > b;

    this._isTriangle = isPositive && satisfiesTriangleInequality;
    this._isEquilateral = this._isTriangle && a === b && b === c;
    this._isIsosceles = this._isTriangle && (a === b || b === c || c === a);
    this._isScalene = this._isTriangle && !this._isIsosceles;
  }

  get isEquilateral(): boolean {
    return this._isEquilateral;
  }

  get isIsosceles(): boolean {
    return this._isIsosceles;
  }

  get isScalene(): boolean {
    return this._isScalene;
  }
}