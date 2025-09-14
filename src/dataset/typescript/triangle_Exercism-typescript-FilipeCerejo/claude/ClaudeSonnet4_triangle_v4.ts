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

    this._isTriangle = a > 0 && b > 0 && c > 0 
      && a + b > c
      && b + c > a
      && a + c > b;

    if (this._isTriangle) {
      this._isEquilateral = a === b && b === c;
      this._isIsosceles = a === b || b === c || c === a;
      this._isScalene = !this._isIsosceles;
    } else {
      this._isEquilateral = false;
      this._isIsosceles = false;
      this._isScalene = false;
    }
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