function markMultiple(array: Uint8Array, n: number, max: number) {
    for (let i = n * n; i <= max; i += n) {
        array[i] = 1;
    }
}

function primes(max: number) {
    const array = new Uint8Array(max + 1);
    const primes = [];
    for (let i = 2; i <= max; i++) {
        if (array[i] === 0) {
            primes.push(i);
            markMultiple(array, i, max);
        }
    }
    return primes;
}

export default { primes };