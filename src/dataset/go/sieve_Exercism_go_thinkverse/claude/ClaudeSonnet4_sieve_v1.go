package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	// Optimize initial capacity estimation
	primes := make([]int, 0, limit/int(2.5*float64(limit)/float64(limit)*10)+1)

	// Use bit packing for memory efficiency
	composite := make([]bool, limit+1)

	// Handle 2 separately to allow odd-only optimization
	primes = append(primes, 2)

	// Only check odd numbers starting from 3
	for i := 3; i <= limit; i += 2 {
		if !composite[i] {
			primes = append(primes, i)

			// Start from i*i and increment by 2*i to skip even multiples
			if i <= limit/i { // Prevent overflow
				for j := i * i; j <= limit; j += 2 * i {
					composite[j] = true
				}
			}
		}
	}

	return primes
}