package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return nil
	}

	composite := make([]bool, limit+1)
	primes := make([]int, 0, limit/2)

	for i := 2; i*i <= limit; i++ {
		if !composite[i] {
			for j := i * i; j <= limit; j += i {
				composite[j] = true
			}
		}
	}

	for i := 2; i <= limit; i++ {
		if !composite[i] {
			primes = append(primes, i)
		}
	}

	return primes
}