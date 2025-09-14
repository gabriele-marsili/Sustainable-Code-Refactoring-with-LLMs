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
    this._isValidTriangle = this._computeIsTriangle();
    
    // Cache triangle type for efficiency
    this._triangleType = this._computeTriangleType();
  }

  /**
   * @returns {boolean}
   * @private
   */
  _computeIsTriangle() {
    return (
      this.a > 0 && this.b > 0 && this.c > 0 &&
      this.a + this.b > this.c &&
      this.b + this.c > this.a &&
      this.a + this.c > this.b
    );
  }

  /**
   * @returns {string}
   * @private
   */
  _computeTriangleType() {
    if (!this._isValidTriangle) return 'invalid';
    
    if (this.a === this.b && this.b === this.c) return 'equilateral';
    if (this.a === this.b || this.b === this.c || this.a === this.c) return 'isosceles';
    return 'scalene';
  }

  /**
   * @returns {boolean}
   */
  get isEquilateral() {
    return this._triangleType === 'equilateral';
  }

  /**
   * @returns {boolean}
   */
  get isIsosceles() {
    return this._triangleType === 'isosceles' || this._triangleType === 'equilateral';
  }

  /**
   * @returns {boolean}
   */
  get isScalene() {
    return this._triangleType === 'scalene';
  }
}