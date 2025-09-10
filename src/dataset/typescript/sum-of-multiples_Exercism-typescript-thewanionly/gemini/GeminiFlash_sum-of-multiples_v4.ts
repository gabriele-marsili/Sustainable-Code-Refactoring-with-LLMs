export function sum(multiples: number[], limit: number): number {
  let sumOfMultiples = 0;
  const uniqueMultiples = [...new Set(multiples)].filter(m => m > 0).sort((a, b) => a - b);

  if (uniqueMultiples.length === 0) {
    return 0;
  }

  for (let i = 1; i < limit; i++) {
    for (const multiple of uniqueMultiples) {
      if (i % multiple === 0) {
        sumOfMultiples += i;
        break;
      }
    }
  }

  return sumOfMultiples;
}