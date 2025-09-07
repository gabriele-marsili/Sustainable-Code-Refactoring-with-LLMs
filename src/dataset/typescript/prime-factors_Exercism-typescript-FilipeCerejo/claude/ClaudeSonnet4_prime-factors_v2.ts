export function calculatePrimeFactors(nbr: number): number[] {
    if (nbr <= 1) return [];
    
    const primeFactors: number[] = [];
    
    // Handle factor 2 separately to allow odd-only iteration
    while (nbr % 2 === 0) {
        primeFactors.push(2);
        nbr /= 2;
    }
    
    // Check odd factors from 3 up to sqrt(nbr)
    for (let factor = 3; factor * factor <= nbr; factor += 2) {
        while (nbr % factor === 0) {
            primeFactors.push(factor);
            nbr /= factor;
        }
    }
    
    // If nbr is still > 1, then it's a prime factor
    if (nbr > 1) {
        primeFactors.push(nbr);
    }
    
    return primeFactors;
}