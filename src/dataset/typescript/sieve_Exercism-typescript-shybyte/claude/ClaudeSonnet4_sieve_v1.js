"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function primes(max) {
    if (max < 2)
        return [];
    const isPrime = new Array(max + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    const result = [];
    for (let i = 2; i * i <= max; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= max; j += i) {
                isPrime[j] = false;
            }
        }
    }
    for (let i = 2; i <= max; i++) {
        if (isPrime[i]) {
            result.push(i);
        }
    }
    return result;
}
exports.default = { primes };
