function primeFactors(remainder) {
	const factors = [];
	
	// Handle factor 2 separately
	while (remainder % 2 === 0) {
		factors.push(2);
		remainder >>>= 1; // Bit shift division by 2
	}
	
	// Check odd factors starting from 3
	for (let factor = 3; factor * factor <= remainder; factor += 2) {
		while (remainder % factor === 0) {
			factors.push(factor);
			remainder /= factor;
		}
	}
	
	// If remainder is a prime greater than 2
	if (remainder > 2) {
		factors.push(remainder);
	}
	
	return factors;
}

export default {for: primeFactors};