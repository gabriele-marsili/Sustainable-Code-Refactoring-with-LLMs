export class Triangle {
  constructor(...sides) {
    this.sides_ = sides.sort((a, b) => a - b);
    const [a, b, c] = this.sides_;

    if (a <= 0 || a + b <= c) {
      this.isEquilateral = false;
      this.isIsosceles = false;
      this.isScalene = false;
      return;
    }

    this.isEquilateral = a === b && b === c;
    this.isIsosceles = a === b || b === c;
    this.isScalene = !this.isEquilateral && !this.isIsosceles;
  }

  get isEquilateral() {
    return this.isEquilateral;
  }

  get isIsosceles() {
    return this.isIsosceles;
  }

  get isScalene() {
    return this.isScalene;
  }
}