function primeFactors(remainder) {
  const factors = [];

  // Optimization 1: Handle the case of 2 separately for efficiency.
  while (remainder % 2 === 0) {
    factors.push(2);
    remainder /= 2;
  }

  // Optimization 2: Iterate only through odd numbers.
  for (let factor = 3; factor * factor <= remainder; factor += 2) {
    while (remainder % factor === 0) {
      factors.push(factor);
      remainder /= factor;
    }
  }

  // Optimization 3: If remainder is still greater than 1, it's a prime factor.
  if (remainder > 1) {
    factors.push(remainder);
  }

  return factors;
}

export default { for: primeFactors };