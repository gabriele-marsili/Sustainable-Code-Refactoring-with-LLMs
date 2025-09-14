export function primes(limit: number): number[] {
    if (limit < 2) return [];
    if (limit === 2) return [2];
    
    const sieve = new Uint8Array(limit - 1).fill(1);
    const sqrtLimit = Math.sqrt(limit);
    
    for (let i = 0; i < sieve.length && (i + 2) <= sqrtLimit; i++) {
        if (sieve[i]) {
            const prime = i + 2;
            for (let j = prime * prime - 2; j < sieve.length; j += prime) {
                sieve[j] = 0;
            }
        }
    }
    
    const result: number[] = [];
    for (let i = 0; i < sieve.length; i++) {
        if (sieve[i]) {
            result.push(i + 2);
        }
    }
    
    return result;
}