function primeFactors(remainder) {
  /* Finds all prime factors of a number */
  // Finds factors smallest to largest adding to the list of factors
  const factors = [];

  if (remainder <= 1) {
    return factors;
  }

  while (remainder % 2 === 0) {
    factors.push(2);
    remainder /= 2;
  }

  let factor = 3;
  const sqrtRemainder = Math.sqrt(remainder);

  while (factor <= sqrtRemainder && remainder > 1) {
    while (remainder % factor === 0) {
      factors.push(factor);
      remainder /= factor;
    }
    factor += 2;
  }

  if (remainder > 1) {
    factors.push(remainder);
  }

  return factors;
}

export default { for: primeFactors };