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
    const a2 = this.a * this.a;
    const b2 = this.b * this.b;
    const c2 = this.c * this.c;
    return a2 + b2 === c2;
  }

  static where(params) {
    const triplets = [];
    const minFactor = params.minFactor || 1;
    const maxFactor = params.maxFactor;
    const targetSum = params.sum;

    for (let a = minFactor; a <= maxFactor; a++) {
      for (let b = a; b <= maxFactor; b++) {
        const c = Math.sqrt(a * a + b * b);
        if (c % 1 !== 0 || c > maxFactor) continue;
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