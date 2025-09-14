export class Triangle {

  private _a: number;
  private _b: number;
  private _c: number;

  private _isTriangle: boolean | undefined;
  private _isEquilateral: boolean | undefined;
  private _isIsosceles: boolean | undefined;
  private _isScalene: boolean | undefined;
  
  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;
  }

  get isEquilateral(): boolean {
    if (this._isEquilateral === undefined) {
      this.calculateTriangleType();
    }
    return this._isTriangle! && this._isEquilateral!;
  }

  get isIsosceles(): boolean {
    if (this._isIsosceles === undefined) {
      this.calculateTriangleType();
    }
    return this._isTriangle! && this._isIsosceles!;
  }

  get isScalene(): boolean {
    if (this._isScalene === undefined) {
      this.calculateTriangleType();
    }
    return this._isTriangle! && this._isScalene!;
  }

  private calculateTriangleType(): void {
    this._isTriangle = this._a > 0 && this._b > 0 && this._c > 0 
      && this._a + this._b > this._c
      && this._b + this._c > this._a
      && this._a + this._c > this._b;

    if (!this._isTriangle) {
      this._isEquilateral = false;
      this._isIsosceles = false;
      this._isScalene = false;
      return;
    }

    const aEqualsB = this._a === this._b;
    const bEqualsC = this._b === this._c;
    const cEqualsA = this._c === this._a;

    this._isEquilateral = aEqualsB && bEqualsC;
    this._isIsosceles = aEqualsB || bEqualsC || cEqualsA;
    this._isScalene = !this._isIsosceles;
  }
}