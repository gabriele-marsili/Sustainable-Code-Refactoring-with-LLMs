package sieve

/*Sieve finds all prime numbers less than limit using the Sieve or Eratosthenes*/
func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	sieve := make([]bool, limit)
	primes := make([]int, 0, limit/2) // Pre-allocate memory
	primes = append(primes, 2)

	for i := 3; i < limit; i += 2 {
		if !sieve[i] {
			primes = append(primes, i)
			// Optimization: Start marking multiples from i*i, as smaller multiples
			// would have already been marked by smaller prime numbers.
			// Also, increment by 2*i to only mark odd numbers.
			for j := i * i; j < limit; j += 2 * i {
				sieve[j] = true
			}
		}
	}

	return primes
}