/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit < 2) return [];
  const sieve = new Uint8Array(limit + 1);
  const result = [];

  for (let num = 2; num <= limit; num++) {
    if (sieve[num] === 0) {
      result.push(num);
      for (let multiple = num * num; multiple <= limit; multiple += num) {
        sieve[multiple] = 1;
      }
    }
  }

  return result;
}