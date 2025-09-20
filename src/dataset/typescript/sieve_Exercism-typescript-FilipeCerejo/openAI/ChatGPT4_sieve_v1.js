"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primes = primes;
function primes(limit) {
    if (limit < 2)
        return [];
    const sieve = new Uint8Array(limit + 1);
    const sqrtLimit = Math.sqrt(limit);
    const primes = [];
    for (let num = 2; num <= limit; num++) {
        if (sieve[num] === 0) {
            primes.push(num);
            if (num <= sqrtLimit) {
                for (let multiple = num * num; multiple <= limit; multiple += num) {
                    sieve[multiple] = 1;
                }
            }
        }
    }
    return primes;
}
