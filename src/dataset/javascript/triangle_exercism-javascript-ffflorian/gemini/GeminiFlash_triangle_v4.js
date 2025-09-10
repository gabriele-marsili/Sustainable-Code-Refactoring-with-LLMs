export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this._isTriangleValue = this._validateTriangle();
  }

  _validateTriangle() {
    if (this.a <= 0 || this.b <= 0 || this.c <= 0) {
      return false;
    }

    const sumAB = this.a + this.b;
    const sumBC = this.b + this.c;
    const sumAC = this.a + this.c;

    if (sumAB < this.c || sumBC < this.a || sumAC < this.b) {
      return false;
    }

    return sumAB !== this.c && sumBC !== this.a && sumAC !== this.b;
  }

  get isEquilateral() {
    return this._isTriangleValue && this.a === this.b && this.b === this.c;
  }

  get isIsosceles() {
    return this._isTriangleValue && (this.a === this.b || this.b === this.c || this.a === this.c);
  }

  get isScalene() {
    return this._isTriangleValue && this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }

  get _isTriangle() {
    return this._isTriangleValue;
  }
}