export function sum(multiples: number[], limit: number): number {
  const uniqueMultiples = [...new Set(multiples.filter(m => m > 0))];
  let sumOfMultiples = 0;

  for (let i = 1; i < limit; i++) {
    let isMultiple = false;
    for (let j = 0; j < uniqueMultiples.length; j++) {
      if (i % uniqueMultiples[j] === 0) {
        isMultiple = true;
        break;
      }
    }
    if (isMultiple) {
      sumOfMultiples += i;
    }
  }

  return sumOfMultiples;
}