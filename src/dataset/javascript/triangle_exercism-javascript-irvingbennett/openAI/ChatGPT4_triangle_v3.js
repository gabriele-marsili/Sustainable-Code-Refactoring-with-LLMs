export class Triangle {
  #sides = [];
  #isEquilateral = false;
  #isIsosceles = false;
  #isScalene = false;

  constructor(...sides) {
    sides.sort((a, b) => a - b);

    if (sides[0] <= 0 || sides[0] + sides[1] <= sides[2]) return;

    this.#sides = sides;

    const [a, b, c] = sides;
    if (a === b && b === c) {
      this.#isEquilateral = true;
      this.#isIsosceles = true;
    } else if (a === b || b === c) {
      this.#isIsosceles = true;
    } else {
      this.#isScalene = true;
    }
  }

  get isEquilateral() {
    return this.#isEquilateral;
  }

  get isIsosceles() {
    return this.#isIsosceles;
  }

  get isScalene() {
    return this.#isScalene;
  }
}