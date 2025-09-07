function primeFactors(remainder) {
	/* Finds all prime factors of a number */
	if (remainder <= 1) return [];
	
	const factors = [];
	
	// Handle factor 2 separately
	while (remainder % 2 === 0) {
		factors.push(2);
		remainder >>>= 1; // Bit shift for division by 2
	}
	
	// Check odd factors from 3 onwards
	for (let factor = 3; factor * factor <= remainder; factor += 2) {
		while (remainder % factor === 0) {
			factors.push(factor);
			remainder /= factor;
		}
	}
	
	// If remainder is still > 1, it's a prime factor
	if (remainder > 1) {
		factors.push(remainder);
	}
	
	return factors;
}

export default {for: primeFactors};