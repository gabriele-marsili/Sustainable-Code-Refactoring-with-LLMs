"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function markMultiple(array, n) {
    for (let i = n; i <= array.length; i += n) {
        array[i] = n;
    }
}
function primes(max) {
    const array = new Array(max + 1);
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
