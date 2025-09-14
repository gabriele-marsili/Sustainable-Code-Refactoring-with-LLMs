/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit < 2) return [];
  if (limit === 2) return [];
  if (limit === 3) return [2];

  const sieve = new Uint8Array(limit - 1);
  const sqrtLimit = Math.sqrt(limit - 1);
  
  for (let i = 0; i < sieve.length; i++) {
    const num = i + 2;
    
    if (sieve[i] === 0 && num <= sqrtLimit) {
      for (let j = num * num - 2; j < sieve.length; j += num) {
        sieve[j] = 1;
      }
    }
  }
  
  const result = [];
  for (let i = 0; i < sieve.length; i++) {
    if (sieve[i] === 0) {
      result.push(i + 2);
    }
  }
  
  return result;
}