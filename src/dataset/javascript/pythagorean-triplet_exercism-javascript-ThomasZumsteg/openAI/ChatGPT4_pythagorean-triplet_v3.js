class Triplet {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  sum() {
    return this.a + this.b + this.c;
  }

  product() {
    return this.a * this.b * this.c;
  }

  isPythagorean() {
    return this.a ** 2 + this.b ** 2 === this.c ** 2;
  }

  static where(params) {
    const triplets = [];
    const minFactor = params.minFactor || 1;
    const maxFactor = params.maxFactor;
    const targetSum = params.sum;

    for (let a = minFactor; a <= maxFactor - 2; a++) {
      for (let b = a + 1; b <= maxFactor - 1; b++) {
        const c = Math.sqrt(a ** 2 + b ** 2);
        if (c % 1 === 0 && c <= maxFactor) {
          const triplet = new Triplet(a, b, c);
          if (!targetSum || triplet.sum() === targetSum) {
            triplets.push(triplet);
          }
        }
      }
    }

    return triplets;
  }
}

export default Triplet;