"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculatePrimeFactors;
function calculatePrimeFactors(nArg) {
    if (nArg < 2) {
        return [];
    }
    const result = [];
    let i = 2;
    let n = nArg;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0) {
            n = n / i;
            result.push(i);
        }
        else {
            i += 1;
        }
    }
    result.push(n);
    return result;
}
