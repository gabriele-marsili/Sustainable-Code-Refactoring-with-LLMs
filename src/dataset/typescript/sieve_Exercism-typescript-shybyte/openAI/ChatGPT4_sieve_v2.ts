function markMultiple(array: Uint8Array, n: number, max: number) {
    for (let i = n * n; i <= max; i += n) {
        array[i] = 1;
    }
}

function primes(max: number): number[] {
    if (max < 2) return [];
    const array = new Uint8Array(max + 1);
    const primes = [2];
    const sqrtMax = Math.sqrt(max);

    for (let i = 3; i <= max; i += 2) {
        if (!array[i]) {
            primes.push(i);
            if (i <= sqrtMax) {
                markMultiple(array, i, max);
            }
        }
    }

    return primes;
}

export default { primes };