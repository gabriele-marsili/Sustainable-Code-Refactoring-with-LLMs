export function sum(multipliers: number[], n: number): number {
  const multiples = new Set<number>();
  let sum = 0;

  for (const multiplier of multipliers) {
    for (let i = multiplier; i < n; i += multiplier) {
      if (!multiples.has(i)) {
        multiples.add(i);
        sum += i;
      }
    }
  }

  return sum;
}