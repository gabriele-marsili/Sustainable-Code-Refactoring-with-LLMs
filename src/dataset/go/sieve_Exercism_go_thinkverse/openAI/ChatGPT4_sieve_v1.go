package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	primes := []int{2}
	composite := make([]bool, limit+1)

	for i := 3; i <= limit; i += 2 {
		if !composite[i] {
			primes = append(primes, i)

			if i*i <= limit {
				for j := i * i; j <= limit; j += 2 * i {
					composite[j] = true
				}
			}
		}
	}

	return primes
}