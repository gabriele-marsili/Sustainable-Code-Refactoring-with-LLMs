export function sum(multipliers: number[], n: number) {
  let sum = 0;
  const seen = new Set<number>();
  
  for (const multiplier of multipliers) {
    if (multiplier <= 0 || multiplier >= n) continue;
    
    for (let i = multiplier; i < n; i += multiplier) {
      if (!seen.has(i)) {
        seen.add(i);
        sum += i;
      }
    }
  }
  
  return sum;
}