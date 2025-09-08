package prime

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	
	// Handle small cases directly
	smallPrimes := []int{0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}
	if n < len(smallPrimes) {
		return smallPrimes[n], true
	}
	
	// Pre-allocate slice with estimated capacity
	capacity := n
	if n > 100 {
		capacity = int(float64(n) * 1.2) // Rough estimate based on prime number theorem
	}
	primes := make([]int, len(smallPrimes), capacity)
	copy(primes, smallPrimes)
	
NextCandidate:
	for candidate := primes[len(primes)-1] + 2; len(primes) <= n; candidate += 2 {
		// Skip multiples of 3
		if candidate%3 == 0 {
			continue NextCandidate
		}
		
		// Only check odd primes starting from 3
		sqrtCandidate := candidate
		for d := 2; d < len(primes) && primes[d]*primes[d] <= sqrtCandidate; d++ {
			if candidate%primes[d] == 0 {
				continue NextCandidate
			}
		}
		primes = append(primes, candidate)
	}
	return primes[n], true
}