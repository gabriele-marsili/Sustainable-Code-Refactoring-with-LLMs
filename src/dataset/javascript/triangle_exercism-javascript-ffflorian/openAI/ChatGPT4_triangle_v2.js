export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get isEquilateral() {
    return this._isTriangle && this.a === this.b && this.b === this.c;
  }

  get isIsosceles() {
    return this._isTriangle && (this.a === this.b || this.b === this.c || this.a === this.c);
  }

  get isScalene() {
    return this._isTriangle && this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }

  get _isDegenerate() {
    const { a, b, c } = this;
    return a + b === c || b + c === a || a + c === b;
  }

  get _isTriangle() {
    const { a, b, c } = this;
    return (
      a > 0 &&
      b > 0 &&
      c > 0 &&
      a + b > c &&
      b + c > a &&
      a + c > b &&
      !this._isDegenerate
    );
  }
}