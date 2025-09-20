"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primes = primes;
function primes(limit) {
    if (limit < 2) {
        return [];
    }
    const isPrime = new Uint8Array(limit + 1);
    isPrime.fill(1, 2, limit + 1);
    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = 0;
            }
        }
    }
    const result = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            result.push(i);
        }
    }
    return result;
}
