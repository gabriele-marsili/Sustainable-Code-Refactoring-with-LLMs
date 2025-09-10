export class Triangle {
  private readonly _isTriangle: boolean;
  private readonly _isEquilateral: boolean;
  private readonly _isIsosceles: boolean;
  private readonly _isScalene: boolean;

  constructor(private readonly _a: number, private readonly _b: number, private readonly _c: number) {
    const isValid = _a > 0 && _b > 0 && _c > 0 
      && _a + _b > _c
      && _b + _c > _a
      && _a + _c > _b;

    this._isTriangle = isValid;
    this._isEquilateral = isValid && _a === _b && _b === _c;
    this._isIsosceles = isValid && (_a === _b || _b === _c || _c === _a);
    this._isScalene = isValid && !this._isIsosceles;
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