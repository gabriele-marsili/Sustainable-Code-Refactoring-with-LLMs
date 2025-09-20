"use strict";
function calculatePrimeFactors(nbr) {
    const primeFactors = [];
    let divisor = 2;
    while (nbr > 1) {
        if (nbr % divisor === 0) {
            primeFactors.push(divisor);
            nbr /= divisor;
            while (nbr % divisor === 0) {
                nbr /= divisor;
            }
        }
        else {
            if (divisor * divisor > nbr) {
                primeFactors.push(nbr);
                break;
            }
            divisor = divisor === 2 ? 3 : divisor + 2;
        }
    }
    return primeFactors;
}
