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
    this._validTriangle = null;
    this._triangleType = null;
  }

  /**
   * @returns {boolean}
   */
  get isEquilateral() {
    if (!this._isTriangle) return false;
    this._computeTriangleType();
    return this._triangleType === 'equilateral';
  }

  /**
   * @returns {boolean}
   */
  get isIsosceles() {
    if (!this._isTriangle) return false;
    this._computeTriangleType();
    return this._triangleType === 'isosceles' || this._triangleType === 'equilateral';
  }

  /**
   * @returns {boolean}
   */
  get isScalene() {
    if (!this._isTriangle) return false;
    this._computeTriangleType();
    return this._triangleType === 'scalene';
  }

  /**
   * @returns {boolean}
   * @private
   */
  get _isDegenerate() {
    const { a, b, c } = this;
    return a + b === c || b + c === a || a + c === b;
  }

  /**
   * @returns {boolean}
   * @private
   */
  get _isTriangle() {
    if (this._validTriangle !== null) return this._validTriangle;
    
    const { a, b, c } = this;
    this._validTriangle = a > 0 && b > 0 && c > 0 &&
      a + b > c && b + c > a && a + c > b;
    
    return this._validTriangle;
  }

  /**
   * @private
   */
  _computeTriangleType() {
    if (this._triangleType !== null) return;
    
    const { a, b, c } = this;
    if (a === b && b === c) {
      this._triangleType = 'equilateral';
    } else if (a === b || b === c || a === c) {
      this._triangleType = 'isosceles';
    } else {
      this._triangleType = 'scalene';
    }
  }
}