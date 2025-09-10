type Options = {
  minFactor?: number;
  maxFactor?: number;
  sum: number;
};

class Triplet {
  constructor(private a: number, private b: number, private c: number) {}

  toArray(): [number, number, number] {
    return [this.a, this.b, this.c];
  }
}

export function triplets({ sum, minFactor = 1, maxFactor }: Options): Triplet[] {
  const tripletsArr: Triplet[] = [];
  const maxLimit = maxFactor ?? sum;

  for (let a = minFactor; a <= maxLimit / 3; a++) {
    for (let b = a + 1; b <= (sum - a) / 2; b++) {
      const c = sum - a - b;
      if (c > b && a ** 2 + b ** 2 === c ** 2) {
        tripletsArr.push(new Triplet(a, b, c));
      }
    }
  }

  return tripletsArr;
}