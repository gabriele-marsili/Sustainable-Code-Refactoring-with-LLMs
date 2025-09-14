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
    
    // Cache triangle validity check
    this._triangleValid = null;
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
    if (!this._isTriangle) return false;
    return this.a === this.b || this.b === this.c || this.a === this.c;
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
  get _isTriangle() {
    if (this._triangleValid !== null) {
      return this._triangleValid;
    }
    
    // Check if all sides are positive
    if (this.a <= 0 || this.b <= 0 || this.c <= 0) {
      return this._triangleValid = false;
    }
    
    // Check triangle inequality (also handles degenerate case)
    this._triangleValid = (
      this.a + this.b > this.c &&
      this.b + this.c > this.a &&
      this.a + this.c > this.b
    );
    
    return this._triangleValid;
  }

  /**
   * @returns {boolean}
   * @private
   */
  get _isDegenerate() {
    return this.a + this.b === this.c || this.b + this.c === this.a || this.a + this.c === this.b;
  }
}