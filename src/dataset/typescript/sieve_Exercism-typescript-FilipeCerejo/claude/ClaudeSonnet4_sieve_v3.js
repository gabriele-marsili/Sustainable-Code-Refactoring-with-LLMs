"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primes = primes;
function primes(limit) {
    if (limit <= 2)
        return [];
    if (limit === 3)
        return [2];
    const sieveSize = Math.floor((limit - 1) / 2);
    const sieve = new Uint8Array(sieveSize);
    const sqrtLimit = Math.floor(Math.sqrt(limit));
    for (let i = 0; i < sieveSize; i++) {
        sieve[i] = 1;
    }
    for (let i = 3; i <= sqrtLimit; i += 2) {
        const idx = Math.floor((i - 3) / 2);
        if (sieve[idx]) {
            const step = i * 2;
            for (let j = i * i; j < limit; j += step) {
                if (j % 2 === 1) {
                    sieve[Math.floor((j - 3) / 2)] = 0;
                }
            }
        }
    }
    const result = [2];
    for (let i = 0; i < sieveSize; i++) {
        if (sieve[i]) {
            result.push(i * 2 + 3);
        }
    }
    return result;
}
