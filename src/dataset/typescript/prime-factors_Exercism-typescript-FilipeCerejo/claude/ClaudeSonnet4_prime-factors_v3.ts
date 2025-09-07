function* getPrimes(nbr: number) {
  if (nbr <= 1) return;
  
  while (nbr % 2 === 0) {
    nbr /= 2;
    yield 2;
  }
  
  for (let p = 3; p * p <= nbr; p += 2) {
    while (nbr % p === 0) {
      nbr /= p;
      yield p;
    }
  }
  
  if (nbr > 2) {
    yield nbr;
  }
}

export function calculatePrimeFactors(nbr: number): number[] {
  return [...getPrimes(nbr)];
}