export class Triangle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  isTriangle() {
    return this.x > 0 && this.y > 0 && this.z > 0;
  }

  isEquilateral() {
    if (!this.isTriangle()) {
      return false;
    }
    return this.x === this.y && this.x === this.z;
  }

  triangleInequality() {
    return (
      this.x + this.y > this.z &&
      this.x + this.z > this.y &&
      this.y + this.z > this.x
    );
  }

  isIsosceles() {
    if (!this.isTriangle()) {
      return false;
    }
    if (this.x === this.y || this.x === this.z || this.y === this.z) {
      return this.triangleInequality();
    }
    return false;
  }

  isScalene() {
    return (
      this.triangleInequality() && this.x !== this.y && this.x !== this.z && this.y !== this.z
    );
  }
}