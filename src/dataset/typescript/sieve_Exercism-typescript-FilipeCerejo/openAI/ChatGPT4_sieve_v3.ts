export function primes(limit: number): number[] {
    if (limit < 2) return [];
    const sieve = new Uint8Array(limit + 1);
    const sqrtLimit = Math.sqrt(limit);
    for (let i = 2; i <= sqrtLimit; i++) {
        if (sieve[i] === 0) {
            for (let j = i * i; j <= limit; j += i) {
                sieve[j] = 1;
            }
        }
    }
    const result: number[] = [];
    for (let i = 2; i <= limit; i++) {
        if (sieve[i] === 0) result.push(i);
    }
    return result;
}