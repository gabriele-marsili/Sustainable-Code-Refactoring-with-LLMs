function primeFactors(remainder) {
	/* Finds all prime factors of a number */
	let factor = 2;
	const factors = [];
	while (factor * factor <= remainder) {
		while (remainder % factor === 0) {
			factors.push(factor);
			remainder /= factor;
		}
		factor = factor === 2 ? 3 : factor + 2; // Skip even numbers after 2
	}
	if (remainder > 1) factors.push(remainder);
	return factors;
}

export default { for: primeFactors };