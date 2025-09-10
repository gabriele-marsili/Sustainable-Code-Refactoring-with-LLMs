function primes(max: number) {
    if (max < 2) {
        return [];
    }

    const isPrime = new Array(max + 1).fill(true);
    const primes: number[] = [];

    isPrime[0] = isPrime[1] = false;

    for (let p = 2; p * p <= max; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= max; i += p) {
                isPrime[i] = false;
            }
        }
    }

    for (let p = 2; p <= max; p++) {
        if (isPrime[p]) {
            primes.push(p);
        }
    }

    return primes;
}

export default { primes };