export class Triangle {
  constructor(...sides) {
    sides.sort((a, b) => a - b);

    if (sides[0] <= 0 || sides[0] + sides[1] <= sides[2]) {
      this.isEquilateral = false;
      this.isIsosceles = false;
      this.isScalene = false;
      return;
    }

    const [a, b, c] = sides;
    this.isEquilateral = a === b && b === c;
    this.isIsosceles = a === b || b === c || a === c;
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