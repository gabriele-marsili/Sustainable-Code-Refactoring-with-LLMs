export function sum(multiples: number[], limit: number): number {
  const multiplesSet = new Set(multiples.filter(m => m > 0));
  let sumOfMultiples = 0;

  for (let i = 1; i < limit; i++) {
    for (const multiple of multiplesSet) {
      if (i % multiple === 0) {
        sumOfMultiples += i;
        break;
      }
    }
  }

  return sumOfMultiples;
}