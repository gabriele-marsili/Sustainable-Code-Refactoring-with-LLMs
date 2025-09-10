export const sum = (divisors, limit) => {
  const uniqueMultiples = new Set();
  divisors.forEach(divisor => {
    for (let candidate = divisor; candidate < limit; candidate += divisor) {
      uniqueMultiples.add(candidate);
    }
  });
  return [...uniqueMultiples].reduce((result, candidate) => result + candidate, 0);
};