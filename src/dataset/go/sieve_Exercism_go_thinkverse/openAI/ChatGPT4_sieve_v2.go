package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	// Use a smaller slice size for odd numbers only, reducing memory usage.
	size := (limit / 2) + 1
	composite := make([]bool, size)
	primes := []int{2}

	// Iterate over odd numbers only, skipping even numbers.
	for i := 3; i <= limit; i += 2 {
		index := i / 2
		if !composite[index] {
			primes = append(primes, i)

			// Start marking multiples from i*i, skip even multiples.
			for j := i * i; j <= limit; j += 2 * i {
				composite[j/2] = true
			}
		}
	}

	return primes
}