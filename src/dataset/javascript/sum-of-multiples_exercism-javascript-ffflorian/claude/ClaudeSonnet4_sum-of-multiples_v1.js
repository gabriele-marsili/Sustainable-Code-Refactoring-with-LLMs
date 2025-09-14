export const sum = (divisors, limit) => {
  const seen = new Set();
  let total = 0;
  
  for (const divisor of divisors) {
    for (let candidate = divisor; candidate < limit; candidate += divisor) {
      if (!seen.has(candidate)) {
        seen.add(candidate);
        total += candidate;
      }
    }
  }
  
  return total;
};