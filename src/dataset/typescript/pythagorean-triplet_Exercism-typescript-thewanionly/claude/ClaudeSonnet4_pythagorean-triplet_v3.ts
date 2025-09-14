type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

class Triplet {
  constructor(private a: number, private b: number, private c: number) {}

  toArray(): [number, number, number] {
    return [this.a, this.b, this.c]
  }
}

export function triplets({ sum, minFactor = 1, maxFactor }: Options): Triplet[] {
  const tripletsArr: Triplet[] = []
  const maxLimit = maxFactor ?? sum

  for (let a = minFactor; a < maxLimit; a++) {
    const maxB = Math.min(maxLimit, (sum - a) / 2)
    
    for (let b = a + 1; b < maxB; b++) {
      const c = sum - a - b
      
      if (c <= b || c >= maxLimit) continue
      
      if (a * a + b * b === c * c) {
        tripletsArr.push(new Triplet(a, b, c))
      }
    }
  }
  
  return tripletsArr
}