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

    this._isTriangle = false;
    this._isEquilateral = false;
    this._isIsosceles = false;
    this._isScalene = false;

    this.calculate();
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

  private calculate(): void {
    const a = this._a;
    const b = this._b;
    const c = this._c;

    if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || b + c <= a || a + c <= b) {
      return;
    }

    this._isTriangle = true;

    if (a === b && b === c) {
      this._isEquilateral = true;
    } else if (a === b || b === c || c === a) {
      this._isIsosceles = true;
    } else {
      this._isScalene = true;
    }
  }
}