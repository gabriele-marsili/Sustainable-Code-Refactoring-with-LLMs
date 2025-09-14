export class Triangle {
  private _isTriangle: boolean;
  private _isEquilateral: boolean;
  private _isIsosceles: boolean;
  private _isScalene: boolean;
  
  constructor(a: number, b: number, c: number) {
    // Early validation - fail fast
    if (a <= 0 || b <= 0 || c <= 0) {
      this._isTriangle = false;
      this._isEquilateral = false;
      this._isIsosceles = false;
      this._isScalene = false;
      return;
    }

    // Triangle inequality check
    this._isTriangle = a + b > c && b + c > a && a + c > b;
    
    if (!this._isTriangle) {
      this._isEquilateral = false;
      this._isIsosceles = false;
      this._isScalene = false;
      return;
    }

    // Calculate triangle types in order of specificity
    this._isEquilateral = a === b && b === c;
    this._isIsosceles = this._isEquilateral || a === b || b === c || c === a;
    this._isScalene = !this._isIsosceles;
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