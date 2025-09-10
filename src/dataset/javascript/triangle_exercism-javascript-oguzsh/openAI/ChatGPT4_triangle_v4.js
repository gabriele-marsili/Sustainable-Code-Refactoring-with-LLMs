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
    return this.isTriangle() && this.x === this.y && this.x === this.z;
  }

  triangleInequality() {
    return (
      this.x + this.y >= this.z &&
      this.x + this.z >= this.y &&
      this.y + this.z >= this.x
    );
  }

  isIsosceles() {
    return (
      this.isTriangle() &&
      (this.x === this.y || this.x === this.z || this.y === this.z) &&
      this.triangleInequality()
    );
  }

  isScalene() {
    return (
      this.triangleInequality() &&
      this.x !== this.y &&
      this.x !== this.z &&
      this.y !== this.z
    );
  }
}