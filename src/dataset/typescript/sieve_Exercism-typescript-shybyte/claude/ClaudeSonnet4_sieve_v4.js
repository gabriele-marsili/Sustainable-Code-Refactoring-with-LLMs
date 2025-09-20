"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function markMultiple(array, n) {
    const maxIndex = array.length - 1;
    for (let i = n * n; i <= maxIndex; i += n) {
        array[i] = true;
    }
}
function primes(max) {
    if (max < 2)
        return [];
    const array = new Array(max + 1).fill(false);
    const primes = [];
    for (let i = 2; i <= max; i++) {
        if (!array[i]) {
            primes.push(i);
            markMultiple(array, i);
        }
    }
    return primes;
}
exports.default = { primes };
