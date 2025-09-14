package sieve

/*Sieve finds all prime numbers less than limit using the Sieve or Eratosthenes*/
func Sieve(limit int) []int {
	if limit <= 2 {
		return []int{}
	}
	
	sieve := make([]bool, limit)
	
	// Pre-allocate slice with estimated capacity to reduce reallocations
	primes := make([]int, 0, limit/int(2.5*float64(limit)/100))
	primes = append(primes, 2)
	
	// Mark even numbers as composite (except 2)
	for i := 4; i < limit; i += 2 {
		sieve[i] = true
	}
	
	// Only check odd numbers
	for i := 3; i*i < limit; i += 2 {
		if !sieve[i] {
			// Start from i*i and increment by 2*i to skip even multiples
			for p := i * i; p < limit; p += 2 * i {
				sieve[p] = true
			}
		}
	}
	
	// Collect remaining odd primes
	for i := 3; i < limit; i += 2 {
		if !sieve[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}