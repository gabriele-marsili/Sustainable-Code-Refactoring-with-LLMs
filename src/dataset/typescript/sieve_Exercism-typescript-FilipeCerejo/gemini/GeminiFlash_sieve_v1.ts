export function primes(limit: number): number[] {
    if (limit < 2) {
        return [];
    }

    const isPrime = new Array(limit).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i < limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    const result: number[] = [];
    for (let i = 2; i < limit; i++) {
        if (isPrime[i]) {
            result.push(i);
        }
    }

    return result;
}