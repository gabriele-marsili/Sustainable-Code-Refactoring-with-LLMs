/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit < 2) return [];
  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let num = 2; num * num <= limit; num++) {
    if (isPrime[num]) {
      for (let multiple = num * num; multiple <= limit; multiple += num) {
        isPrime[multiple] = false;
      }
    }
  }

  return isPrime.reduce((primes, isPrime, num) => {
    if (isPrime) primes.push(num);
    return primes;
  }, []);
}