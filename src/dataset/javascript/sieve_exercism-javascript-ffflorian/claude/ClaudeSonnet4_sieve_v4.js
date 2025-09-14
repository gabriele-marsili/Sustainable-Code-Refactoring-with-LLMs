/**
 * @param {number} limit
 * @returns {number[]}
 */
export function primes(limit) {
  if (limit <= 2) return [];
  
  const isPrime = new Array(limit).fill(true);
  isPrime[0] = isPrime[1] = false;
  
  const sqrtLimit = Math.sqrt(limit);
  
  for (let i = 2; i <= sqrtLimit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < limit; j += i) {
        isPrime[j] = false;
      }
    }
  }
  
  const result = [];
  for (let i = 2; i < limit; i++) {
    if (isPrime[i]) {
      result.push(i);
    }
  }
  
  return result;
}