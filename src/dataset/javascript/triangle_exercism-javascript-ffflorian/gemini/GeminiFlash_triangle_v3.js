export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this._isTriangleCalculated = false;
    this._isTriangleValue = false;
  }

  get isEquilateral() {
    if (!this._isTriangle) return false;
    return this.a === this.b && this.b === this.c;
  }

  get isIsosceles() {
    if (!this._isTriangle) return false;
    return this.a === this.b || this.b === this.c || this.a === this.c;
  }

  get isScalene() {
    if (!this._isTriangle) return false;
    return this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }

  get _isDegenerate() {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    return a + b === c || b + c === a || a + c === b;
  }

  get _isTriangle() {
    if (this._isTriangleCalculated) {
      return this._isTriangleValue;
    }

    const a = this.a;
    const b = this.b;
    const c = this.c;

    if (a <= 0 || b <= 0 || c <= 0) {
      this._isTriangleValue = false;
      this._isTriangleCalculated = true;
      return false;
    }

    if (a + b < c || b + c < a || a + c < b || this._isDegenerate) {
      this._isTriangleValue = false;
      this._isTriangleCalculated = true;
      return false;
    }

    this._isTriangleValue = true;
    this._isTriangleCalculated = true;
    return true;
  }
}