export const sum = (divisors, limit) => {
  const multiples = new Set();
  let sumOfMultiples = 0;

  for (const divisor of divisors) {
    for (let multiple = divisor; multiple < limit; multiple += divisor) {
      if (!multiples.has(multiple)) {
        multiples.add(multiple);
        sumOfMultiples += multiple;
      }
    }
  }

  return sumOfMultiples;
};