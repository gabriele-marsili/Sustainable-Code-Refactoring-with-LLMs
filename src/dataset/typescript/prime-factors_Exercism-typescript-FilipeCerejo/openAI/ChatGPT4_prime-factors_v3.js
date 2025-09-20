"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrimeFactors = calculatePrimeFactors;
function* getPrimes(nbr) {
    while (nbr % 2 === 0) {
        nbr /= 2;
        yield 2;
    }
    let factor = 3;
    const sqrtNbr = Math.sqrt(nbr);
    while (factor <= sqrtNbr) {
        while (nbr % factor === 0) {
            nbr /= factor;
            yield factor;
        }
        factor += 2;
    }
    if (nbr > 1)
        yield nbr;
}
function calculatePrimeFactors(nbr) {
    return [...getPrimes(nbr)];
}
