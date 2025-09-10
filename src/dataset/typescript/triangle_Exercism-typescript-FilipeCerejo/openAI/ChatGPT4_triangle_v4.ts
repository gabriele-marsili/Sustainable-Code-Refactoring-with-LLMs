export class Triangle {
  private readonly _a: number;
  private readonly _b: number;
  private readonly _c: number;

  private readonly _isTriangle: boolean;
  private readonly _isEquilateral: boolean;
  private readonly _isIsosceles: boolean;
  private readonly _isScalene: boolean;

  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;

    const isValidTriangle = a > 0 && b > 0 && c > 0 
      && a + b > c 
      && b + c > a 
      && a + c > b;

    this._isTriangle = isValidTriangle;
    this._isEquilateral = isValidTriangle && a === b && b === c;
    this._isIsosceles = isValidTriangle && (a === b || b === c || c === a);
    this._isScalene = isValidTriangle && !(a === b || b === c || c === a);
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