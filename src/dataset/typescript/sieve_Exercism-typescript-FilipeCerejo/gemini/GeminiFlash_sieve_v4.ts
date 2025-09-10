export function primes(limit: number): number[] {
    if (limit < 2) {
        return [];
    }

    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    const primeNumbers: number[] = [];
    for (let p = 2; p <= limit; p++) {
        if (isPrime[p]) {
            primeNumbers.push(p);
        }
    }

    return primeNumbers;
}