package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	// Only track odd numbers (except 2)
	size := (limit-1)/2 + 1
	composite := make([]bool, size)
	
	// Pre-allocate with better capacity estimation
	primes := make([]int, 0, int(float64(limit)/2.3))
	primes = append(primes, 2)

	// Only check odd numbers
	for i := 3; i <= limit; i += 2 {
		idx := (i - 1) / 2
		if !composite[idx] {
			primes = append(primes, i)

			// Mark multiples starting from i*i, only odd multiples
			if i*i <= limit {
				for j := i * i; j <= limit; j += 2 * i {
					composite[(j-1)/2] = true
				}
			}
		}
	}

	return primes
}