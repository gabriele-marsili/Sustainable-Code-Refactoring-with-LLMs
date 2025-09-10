export class Triangle {
  /**
   *
   * @param {number} a
   * @param {number} b
   * @param {number} c
   */
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this._isTriangleValue = this._validateTriangle();
  }

  /**
   * @returns {boolean}
   */
  get isEquilateral() {
    return this._isTriangleValue && this.a === this.b && this.a === this.c;
  }

  /**
   * @returns {boolean}
   */
  get isIsosceles() {
    return this._isTriangleValue && (this.a === this.b || this.b === this.c || this.a === this.c) && !this.isScalene;
  }

  /**
   * @returns {boolean}
   */
  get isScalene() {
    return this._isTriangleValue && this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }

  /**
   * @returns {boolean}
   * @private
   */
  _isDegenerate() {
    return this.a + this.b === this.c || this.b + this.c === this.a || this.a + this.c === this.b;
  }

  /**
   * @returns {boolean}
   * @private
   */
  _validateTriangle() {
    const { a, b, c } = this;

    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }

    if (a + b < c || b + c < a || a + c < b) {
      return false;
    }

    return !this._isDegenerate();
  }

  get _isTriangle() {
    return this._isTriangleValue;
  }
}