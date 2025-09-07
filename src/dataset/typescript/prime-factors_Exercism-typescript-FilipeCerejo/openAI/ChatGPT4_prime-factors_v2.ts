function* getPrimes(nbr: number) {
  while (nbr % 2 === 0) {
    nbr /= 2;
    yield 2;
  }
  let factor = 3;
  const sqrtNbr = () => Math.sqrt(nbr);
  while (factor <= sqrtNbr()) {
    while (nbr % factor === 0) {
      nbr /= factor;
      yield factor;
    }
    factor += 2;
  }
  if (nbr > 1) yield nbr;
}

export function calculatePrimeFactors(nbr: number): number[] {
  return [...getPrimes(nbr)];
}