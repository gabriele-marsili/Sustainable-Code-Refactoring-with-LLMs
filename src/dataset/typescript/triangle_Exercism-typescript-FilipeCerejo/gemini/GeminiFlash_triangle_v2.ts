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
    if (this._a <= 0 || this._b <= 0 || this._c <= 0) {
      this._isTriangle = false;
      return;
    }

    this._isTriangle = (this._a + this._b > this._c) && (this._b + this._c > this._a) && (this._a + this._c > this._b);

    if (!this._isTriangle) {
      return;
    }
    
    if (this._a === this._b && this._b === this._c) {
      this._isEquilateral = true;
    } else if (this._a === this._b || this._b === this._c || this._a === this._c) {
      this._isIsosceles = true;
    } else {
      this._isScalene = true;
    }
  }
}