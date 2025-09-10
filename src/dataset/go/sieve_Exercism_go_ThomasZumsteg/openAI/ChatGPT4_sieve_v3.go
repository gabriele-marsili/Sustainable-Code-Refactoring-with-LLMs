package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}
	sieve := make([]bool, limit)
	primes := []int{}
	for i := 2; i < limit; i++ {
		if !sieve[i] {
			primes = append(primes, i)
			for p := i * i; p < limit; p += i {
				sieve[p] = true
			}
		}
	}
	return primes
}