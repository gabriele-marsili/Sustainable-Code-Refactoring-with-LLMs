export class Triangle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._isValidTriangle = null;
    this._satisfiesInequality = null;
  }

  isTriangle() {
    if (this._isValidTriangle === null) {
      this._isValidTriangle = this.x > 0 && this.y > 0 && this.z > 0;
    }
    return this._isValidTriangle;
  }

  triangleInequality() {
    if (this._satisfiesInequality === null) {
      this._satisfiesInequality = 
        this.x + this.y >= this.z &&
        this.x + this.z >= this.y &&
        this.y + this.z >= this.x;
    }
    return this._satisfiesInequality;
  }

  isEquilateral() {
    return this.isTriangle() && this.x === this.y && this.x === this.z;
  }

  isIsosceles() {
    return this.isTriangle() && 
           (this.x === this.y || this.x === this.z || this.y === this.z) &&
           this.triangleInequality();
  }

  isScalene() {
    return this.triangleInequality() && 
           this.x !== this.y && this.x !== this.z && this.y !== this.z;
  }
}