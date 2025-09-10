/* Finds pythagorean triplets */
class Triplet {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /* Sum of the sides of a triple */
  sum() {
    return this.a + this.b + this.c;
  }

  /* Product of the sides of a triple */
  product() {
    return this.a * this.b * this.c;
  }

  /* Tests if the set of numbers is pythagorean */
  isPythagorean() {
    return this.a * this.a + this.b * this.b === this.c * this.c;
  }

  static where(params) {
    const triplets = [];
    const minFactor = params.minFactor || 1;
    const maxFactor = params.maxFactor;
    const targetSum = params.sum;

    for (let a = minFactor; a <= maxFactor - 2; a++) {
      for (let b = a + 1; b <= maxFactor - 1; b++) {
        const c = Math.sqrt(a * a + b * b);
        if (c % 1 !== 0 || c > maxFactor) continue; // Ensure c is an integer and within bounds
        const triplet = new Triplet(a, b, c);
        if (!targetSum || triplet.sum() === targetSum) {
          triplets.push(triplet);
        }
      }
    }

    return triplets;
  }
}

export default Triplet;