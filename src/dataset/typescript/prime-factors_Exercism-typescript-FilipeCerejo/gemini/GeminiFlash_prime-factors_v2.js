"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrimeFactors = calculatePrimeFactors;
function calculatePrimeFactors(nbr) {
    const primeFactors = [];
    let divisor = 2;
    while (nbr > 1) {
        if (nbr % divisor === 0) {
            primeFactors.push(divisor);
            nbr /= divisor;
        }
        else {
            if (divisor * divisor > nbr) {
                primeFactors.push(nbr);
                break;
            }
            divisor++;
        }
    }
    return primeFactors;
}
