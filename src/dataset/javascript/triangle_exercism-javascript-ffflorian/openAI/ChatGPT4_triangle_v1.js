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
    this._isTriangle = this._calculateIsTriangle();
    this._isDegenerate = this._calculateIsDegenerate();
  }

  /**
   * @returns {boolean}
   */
  get isEquilateral() {
    return this._isTriangle && this.a === this.b && this.b === this.c;
  }

  /**
   * @returns {boolean}
   */
  get isIsosceles() {
    return this._isTriangle && (this.a === this.b || this.b === this.c || this.c === this.a);
  }

  /**
   * @returns {boolean}
   */
  get isScalene() {
    return this._isTriangle && this.a !== this.b && this.b !== this.c && this.c !== this.a;
  }

  /**
   * @returns {boolean}
   * @private
   */
  _calculateIsDegenerate() {
    return this.a + this.b === this.c || this.b + this.c === this.a || this.a + this.c === this.b;
  }

  /**
   * @returns {boolean}
   * @private
   */
  _calculateIsTriangle() {
    return (
      this.a > 0 &&
      this.b > 0 &&
      this.c > 0 &&
      this.a + this.b > this.c &&
      this.b + this.c > this.a &&
      this.a + this.c > this.b &&
      !this._calculateIsDegenerate()
    );
  }
}