function primeFactors(remainder) {
    if (remainder <= 1) return [];
    if (remainder === 2) return [2];
    
    const factors = [];
    
    while (remainder % 2 === 0) {
        factors.push(2);
        remainder >>>= 1;
    }
    
    const sqrtRemainder = Math.sqrt(remainder);
    for (let factor = 3; factor <= sqrtRemainder; factor += 2) {
        while (remainder % factor === 0) {
            factors.push(factor);
            remainder /= factor;
        }
    }
    
    if (remainder > 2) {
        factors.push(remainder);
    }
    
    return factors;
}

export default {for: primeFactors};