/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit < 2) {
    return [];
  }

  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        isPrime[i] = false;
      }
    }
  }

  const primesList = [];
  for (let p = 2; p <= limit; p++) {
    if (isPrime[p]) {
      primesList.push(p);
    }
  }

  return primesList;
}