export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this._triangleType = null;
    this._isValidTriangle = null;
  }

  get isEquilateral() {
    this._computeTriangleProperties();
    return this._isValidTriangle && this._triangleType === 'equilateral';
  }

  get isIsosceles() {
    this._computeTriangleProperties();
    return this._isValidTriangle && (this._triangleType === 'equilateral' || this._triangleType === 'isosceles');
  }

  get isScalene() {
    this._computeTriangleProperties();
    return this._isValidTriangle && this._triangleType === 'scalene';
  }

  get _isDegenerate() {
    return this.a + this.b === this.c || this.b + this.c === this.a || this.a + this.c === this.b;
  }

  get _isTriangle() {
    if (this._isValidTriangle !== null) {
      return this._isValidTriangle;
    }
    
    this._isValidTriangle = (
      this.a * this.b * this.c > 0 &&
      this.a + this.b > this.c &&
      this.b + this.c > this.a &&
      this.a + this.c > this.b
    );
    
    return this._isValidTriangle;
  }

  _computeTriangleProperties() {
    if (this._triangleType !== null) {
      return;
    }

    if (!this._isTriangle) {
      return;
    }

    if (this.a === this.b && this.b === this.c) {
      this._triangleType = 'equilateral';
    } else if (this.a === this.b || this.b === this.c || this.a === this.c) {
      this._triangleType = 'isosceles';
    } else {
      this._triangleType = 'scalene';
    }
  }
}