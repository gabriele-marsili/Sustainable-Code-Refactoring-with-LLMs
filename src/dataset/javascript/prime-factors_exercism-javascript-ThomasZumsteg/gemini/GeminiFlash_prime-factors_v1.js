function primeFactors(remainder) {
  const factors = [];

  // Optimization 1: Handle edge cases early
  if (remainder <= 1) {
    return factors;
  }

  // Optimization 2: Check for divisibility by 2 first
  while (remainder % 2 === 0) {
    factors.push(2);
    remainder /= 2;
  }

  // Optimization 3: Iterate only through odd numbers
  for (let factor = 3; factor * factor <= remainder; factor += 2) {
    while (remainder % factor === 0) {
      factors.push(factor);
      remainder /= factor;
    }
  }

  // Optimization 4: If remainder is still greater than 1, it's prime
  if (remainder > 1) {
    factors.push(remainder);
  }

  return factors;
}

export default { for: primeFactors };