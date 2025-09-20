"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrimeFactors = calculatePrimeFactors;
function calculatePrimeFactors(nbr) {
    const primeFactors = [];
    let n = nbr;
    let divisor = 2;
    while (divisor * divisor <= n) {
        while (n % divisor === 0) {
            primeFactors.push(divisor);
            n /= divisor;
        }
        divisor = divisor === 2 ? 3 : divisor + 2;
    }
    if (n > 1) {
        primeFactors.push(n);
    }
    return primeFactors;
}
