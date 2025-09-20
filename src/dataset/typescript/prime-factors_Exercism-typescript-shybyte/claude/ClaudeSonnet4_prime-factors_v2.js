"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculatePrimeFactors;
function calculatePrimeFactors(nArg) {
    if (nArg < 2) {
        return [];
    }
    const result = [];
    let n = nArg;
    // Handle factor 2 separately to avoid even number checks
    while (n % 2 === 0) {
        result.push(2);
        n = n / 2;
    }
    // Check odd factors only, starting from 3
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            result.push(i);
            n = n / i;
        }
    }
    // If n is still greater than 1, it's a prime factor
    if (n > 1) {
        result.push(n);
    }
    return result;
}
