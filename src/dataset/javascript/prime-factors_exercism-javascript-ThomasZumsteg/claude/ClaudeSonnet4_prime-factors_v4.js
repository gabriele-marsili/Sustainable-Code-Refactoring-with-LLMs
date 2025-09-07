function primeFactors(remainder) {
    if (remainder <= 1) return [];
    
    const factors = [];
    
    while (remainder % 2 === 0) {
        factors.push(2);
        remainder >>>= 1;
    }
    
    for (let factor = 3; factor * factor <= remainder; factor += 2) {
        while (remainder % factor === 0) {
            factors.push(factor);
            remainder /= factor;
        }
    }
    
    if (remainder > 1) {
        factors.push(remainder);
    }
    
    return factors;
}

export default {for: primeFactors};