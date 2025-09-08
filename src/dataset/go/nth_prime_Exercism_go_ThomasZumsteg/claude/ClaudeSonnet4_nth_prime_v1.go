package prime

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	
	// Pre-computed primes for quick lookup
	precomputed := []int{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}
	
	if n <= len(precomputed) {
		return precomputed[n-1], true
	}
	
	// Initialize with precomputed primes
	primes := make([]int, len(precomputed), n)
	copy(primes, precomputed)
	
	// Start from next odd candidate after last precomputed prime
	candidate := primes[len(primes)-1] + 2
	
NextCandidate:
	for len(primes) < n {
		// Skip multiples of 3 (after checking divisibility by 2 is handled by odd numbers)
		if candidate%3 == 0 {
			candidate += 2
			continue
		}
		
		// Check divisibility only by primes up to sqrt(candidate)
		sqrtCandidate := candidate * candidate
		for i := 1; i < len(primes) && primes[i]*primes[i] <= candidate; i++ {
			if candidate%primes[i] == 0 {
				candidate += 2
				continue NextCandidate
			}
		}
		
		primes = append(primes, candidate)
		candidate += 2
	}
	
	return primes[n-1], true
}