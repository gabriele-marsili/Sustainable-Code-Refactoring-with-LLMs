"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function markMultiple(array, n, max) {
    for (let i = n * n; i <= max; i += n) {
        array[i] = 1;
    }
}
function primes(max) {
    if (max < 2) {
        return [];
    }
    const array = new Uint8Array(max + 1);
    const primes = [];
    for (let i = 2; i <= max; i++) {
        if (array[i] === 0) {
            primes.push(i);
            if (i * i <= max) {
                markMultiple(array, i, max);
            }
        }
    }
    return primes;
}
exports.default = { primes };
