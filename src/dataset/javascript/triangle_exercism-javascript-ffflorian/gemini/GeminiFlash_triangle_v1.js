export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this._isTriangleValue = this._validateTriangle();
  }

  _validateTriangle() {
    const { a, b, c } = this;

    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }

    if (a + b < c || a + c < b || b + c < a) {
      return false;
    }

    if (a + b === c || a + c === b || b + c === a) {
      return false;
    }

    return true;
  }

  get isEquilateral() {
    return this._isTriangleValue && this.a === this.b && this.b === this.c;
  }

  get isIsosceles() {
    if (!this._isTriangleValue) {
      return false;
    }
    return this.a === this.b || this.a === this.c || this.b === this.c;
  }

  get isScalene() {
    return this._isTriangleValue && this.a !== this.b && this.a !== this.c && this.b !== this.c;
  }

  get _isTriangle() {
    return this._isTriangleValue;
  }
}