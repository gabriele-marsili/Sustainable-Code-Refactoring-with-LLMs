export class Triangle {

  private _a: number;
  private _b: number;
  private _c: number;

  private _isTriangle: boolean = false;
  private _isEquilateral: boolean = false;
  private _isIsosceles: boolean = false;
  private _isScalene: boolean = false;
  
  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;

    this.calculate();
  }

  get isEquilateral(): boolean {
    return this._isTriangle && this._isEquilateral;
  }

  get isIsosceles(): boolean {
    return this._isTriangle && this._isIsosceles;
  }

  get isScalene(): boolean {
    return this._isTriangle && this._isScalene;
  }

  private calculate(): void {
    this._isTriangle = this._a > 0 && this._b > 0 && this._c > 0 
      && this._a + this._b > this._c
      && this._b + this._c > this._a
      && this._a + this._c > this._b;

    this._isEquilateral = this._isTriangle && this._a === this._b && this._b === this._c;
    
    this._isIsosceles = this._isTriangle && (this._a === this._b || this._b === this._c || this._c === this._a);
    
    this._isScalene = this._isTriangle && !this._isIsosceles;
  }
}
