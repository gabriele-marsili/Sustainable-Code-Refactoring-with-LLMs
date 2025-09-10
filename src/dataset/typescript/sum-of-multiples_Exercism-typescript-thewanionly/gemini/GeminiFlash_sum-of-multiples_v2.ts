export function sum(multiples: number[], limit: number): number {
  const uniqueMultiples = [...new Set(multiples.filter(m => m > 0))];
  let sumOfMultiples = 0;

  if (uniqueMultiples.length === 0) {
    return 0;
  }

  const seen = new Set<number>();

  for (const multiple of uniqueMultiples) {
    for (let i = multiple; i < limit; i += multiple) {
      if (!seen.has(i)) {
        sumOfMultiples += i;
        seen.add(i);
      }
    }
  }

  return sumOfMultiples;
}