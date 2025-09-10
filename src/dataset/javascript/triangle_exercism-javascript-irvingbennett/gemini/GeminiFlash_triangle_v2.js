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

    if (a === b && b === c) {
      this.isEquilateral = true;
      this.isIsosceles = true;
      this.isScalene = false;
    } else if (a === b || b === c) {
      this.isEquilateral = false;
      this.isIsosceles = true;
      this.isScalene = false;
    } else {
      this.isEquilateral = false;
      this.isIsosceles = false;
      this.isScalene = true;
    }
  }

  get isEquilateral() {
    return this.isEquilateral === true;
  }

  get isIsosceles() {
    return this.isIsosceles === true;
  }

  get isScalene() {
    return this.isScalene === true;
  }
}