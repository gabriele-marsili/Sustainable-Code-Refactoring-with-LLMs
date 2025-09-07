export function calculatePrimeFactors(nbr: number): number[] {
    const primeFactors: number[] = [];
    let divisor = 2;

    while (nbr > 1) {
        if (nbr % divisor === 0) {
            primeFactors.push(divisor);
            nbr /= divisor;
        } else {
            divisor = (divisor === 2) ? 3 : divisor + 2; // Skip even numbers after 2
            if (divisor * divisor > nbr) {
                // If no divisor found up to sqrt(nbr), then nbr is prime
                if (nbr > 1) {
                    primeFactors.push(nbr);
                }
                break;
            }
        }
    }

    return primeFactors;
}