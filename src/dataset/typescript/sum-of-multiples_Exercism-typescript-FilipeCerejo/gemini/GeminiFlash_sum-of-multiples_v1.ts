export function sum(multipliers: number[], n: number) {
  const multiples = new Set<number>();
  let sum = 0;

  for (const multiplier of multipliers) {
    if (multiplier <= 0) continue; // Avoid infinite loops and invalid multipliers

    for (let i = multiplier; i < n; i += multiplier) {
      multiples.add(i);
    }
  }

  for (const multiple of multiples) {
    sum += multiple;
  }

  return sum;
}