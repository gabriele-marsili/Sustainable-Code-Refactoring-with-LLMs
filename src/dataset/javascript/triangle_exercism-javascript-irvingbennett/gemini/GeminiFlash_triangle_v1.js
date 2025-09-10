export class Triangle {
  constructor(...sides) {
    this.sides = sides.sort((a, b) => a - b);
    this.isEquilateral = false;
    this.isIsosceles = false;
    this.isScalene = false;

    const [a, b, c] = this.sides;

    if (a <= 0 || a + b <= c) {
      return;
    }

    if (a === b && b === c) {
      this.isEquilateral = true;
      this.isIsosceles = true;
    } else if (a === b || b === c) {
      this.isIsosceles = true;
    } else {
      this.isScalene = true;
    }
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