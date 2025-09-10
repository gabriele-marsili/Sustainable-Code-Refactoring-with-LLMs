function markMultiple (array: number[], n: number, max: number) {
    for (let i = n * n; i <= max; i += n) {
        if (array[i] === undefined) {
            array[i] = n;
        }
    }
}

function primes(max: number) {
    if (max < 2) {
        return [];
    }

    const array: (number | undefined)[] = new Array(max + 1).fill(undefined);
    const primes: number[] = [];

    for (let i = 2; i <= max; i++) {
        if (array[i] === undefined) {
            primes.push(i);
            if (i * i <= max) {
                markMultiple(array, i, max);
            }
        }
    }
    return primes;
}

export default {primes}