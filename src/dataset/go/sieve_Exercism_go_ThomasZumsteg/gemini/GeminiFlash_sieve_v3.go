package sieve

/*Sieve finds all prime numbers less than limit using the Sieve or Eratosthenes*/
func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	sieve := make([]bool, limit)
	primes := make([]int, 0, limit/4) // Pre-allocate, assuming ~25% are prime
	primes = append(primes, 2)

	for i := 3; i < limit; i += 2 {
		if !sieve[i] {
			primes = append(primes, i)
			// Optimization: Start marking multiples from i*i, as smaller multiples are already marked
			// Optimization: Increment by 2*i, as even multiples are already marked
			for p := i * i; p < limit; p += 2 * i {
				sieve[p] = true
			}
		}
	}
	return primes
}