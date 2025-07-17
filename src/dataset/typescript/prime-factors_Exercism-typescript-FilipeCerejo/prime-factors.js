"use strict";
// function calculatePrimeFactors(nbr: number): number[] {
//     let primeFactors: number[] = [];
//     let currentPrime = 2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrimeFactors = calculatePrimeFactors;
//     while (currentPrime <= nbr && nbr !== 1) {
//         if (nbr % currentPrime === 0) {
//             primeFactors.push(currentPrime);
//             nbr /= currentPrime;
//         } else {
//             currentPrime++;
//         }
//     }
//     return primeFactors;
// }
function* getPrimes(nbr) {
    for (let p = 2; p <= nbr; p++) {
        while (nbr % p === 0) {
            nbr /= p;
            yield p;
        }
    }
}
function calculatePrimeFactors(nbr) {
    return [...getPrimes(nbr)];
}
