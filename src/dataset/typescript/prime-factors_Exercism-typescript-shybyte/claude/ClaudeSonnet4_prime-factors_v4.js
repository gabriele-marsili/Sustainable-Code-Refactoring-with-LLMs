"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculatePrimeFactors;
function calculatePrimeFactors(nArg) {
    if (nArg < 2) {
        return [];
    }
    const result = [];
    let n = nArg;
    while (n % 2 === 0) {
        result.push(2);
        n >>>= 1;
    }
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            result.push(i);
            n /= i;
        }
    }
    if (n > 1) {
        result.push(n);
    }
    return result;
}
