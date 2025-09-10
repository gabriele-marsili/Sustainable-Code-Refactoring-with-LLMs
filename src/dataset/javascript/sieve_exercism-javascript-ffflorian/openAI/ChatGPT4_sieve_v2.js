/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit < 2) return [];
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let num = 2; num * num <= limit; num++) {
    if (sieve[num]) {
      for (let multiple = num * num; multiple <= limit; multiple += num) {
        sieve[multiple] = false;
      }
    }
  }

  return sieve.reduce((primes, isPrime, num) => {
    if (isPrime) primes.push(num);
    return primes;
  }, []);
}