package sieve

/*Sieve finds all prime numbers less than limit using the Sieve or Eratosthenes*/
func Sieve(limit int) []int {
	if limit <= 2 {
		return []int{}
	}
	if limit == 3 {
		return []int{2}
	}
	
	// Use bitset for memory efficiency - only track odd numbers
	sieveSize := (limit + 1) / 2
	sieve := make([]bool, sieveSize)
	
	// Pre-allocate with estimated capacity to reduce reallocations
	capacity := int(float64(limit) / (2.5 * 2.3)) // Approximation based on prime number theorem
	if capacity < 8 {
		capacity = 8
	}
	primes := make([]int, 1, capacity)
	primes[0] = 2
	
	sqrtLimit := int(float64(limit) * 0.5) // Approximate sqrt to avoid expensive sqrt call
	for sqrtLimit*sqrtLimit < limit {
		sqrtLimit++
	}
	
	for i := 3; i < limit; i += 2 {
		idx := i / 2
		if !sieve[idx] {
			primes = append(primes, i)
			if i <= sqrtLimit {
				// Only sieve multiples of primes up to sqrt(limit)
				for p := i * i; p < limit; p += i * 2 {
					sieve[p/2] = true
				}
			}
		}
	}
	
	return primes
}