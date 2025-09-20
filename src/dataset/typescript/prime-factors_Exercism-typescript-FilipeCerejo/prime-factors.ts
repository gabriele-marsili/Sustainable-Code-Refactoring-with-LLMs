export function calculatePrimeFactors(nbr: number): number[] {
    if (nbr <= 1) return [];
    
    const primeFactors: number[] = [];
    let n = nbr;
    
    // Handle factor 2 separately to allow odd-only iteration
    while (n % 2 === 0) {
        primeFactors.push(2);
        n /= 2;
    }
    
    // Check odd factors from 3 onwards
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            primeFactors.push(i);
            n /= i;
        }
    }
    
    // If n is still greater than 1, it's a prime factor
    if (n > 1) {
        primeFactors.push(n);
    }
    
    return primeFactors;
}