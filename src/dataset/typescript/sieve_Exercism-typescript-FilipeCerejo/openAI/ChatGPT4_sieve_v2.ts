export function primes(limit: number): number[] {
    if (limit < 2) return [];
    const sieve = new Uint8Array(limit + 1);
    const sqrtLimit = Math.sqrt(limit);
    const primes: number[] = [];

    for (let num = 2; num <= limit; num++) {
        if (sieve[num] === 0) {
            primes.push(num);
            if (num <= sqrtLimit) {
                for (let multiple = num * num; multiple <= limit; multiple += num) {
                    sieve[multiple] = 1;
                }
            }
        }
    }

    return primes;
}