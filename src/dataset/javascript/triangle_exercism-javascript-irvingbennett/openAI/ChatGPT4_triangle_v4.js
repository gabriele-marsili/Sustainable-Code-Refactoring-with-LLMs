export class Triangle {
  #sides;
  #isEquilateral = false;
  #isIsosceles = false;
  #isScalene = false;

  constructor(...sides) {
    this.#sides = sides.sort((a, b) => a - b);
    if (this.#sides[0] <= 0 || this.#sides[0] + this.#sides[1] <= this.#sides[2]) return;

    const [a, b, c] = this.#sides;
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