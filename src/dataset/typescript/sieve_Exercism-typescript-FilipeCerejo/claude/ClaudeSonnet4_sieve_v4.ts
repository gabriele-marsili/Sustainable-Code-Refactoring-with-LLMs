export function primes(limit: number): number[] {
    if (limit <= 2) return [];
    if (limit === 3) return [2];
    
    const sieveSize = limit - 1;
    const sieve = new Uint8Array(sieveSize);
    sieve.fill(1);
    
    const sqrtLimit = Math.sqrt(limit);
    
    for (let i = 0; i < sieveSize && (i + 2) <= sqrtLimit; i++) {
        if (sieve[i]) {
            const prime = i + 2;
            const start = prime * prime - 2;
            for (let j = start; j < sieveSize; j += prime) {
                sieve[j] = 0;
            }
        }
    }
    
    const result: number[] = [];
    for (let i = 0; i < sieveSize; i++) {
        if (sieve[i]) {
            result.push(i + 2);
        }
    }
    
    return result;
}