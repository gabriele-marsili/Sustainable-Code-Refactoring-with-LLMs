export function sum(multiples: number[], limit: number): number {
  const uniqueMultiples = [...new Set(multiples.filter(m => m > 0))].sort((a, b) => a - b);
  let sumOfMultiples = 0;
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