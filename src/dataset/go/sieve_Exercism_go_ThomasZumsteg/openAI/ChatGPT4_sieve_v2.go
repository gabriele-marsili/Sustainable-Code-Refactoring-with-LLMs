package sieve

/*Sieve finds all prime numbers less than limit using the Sieve of Eratosthenes*/
func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}
	sieve := make([]bool, limit)
	primes := []int{}
	sieve[0], sieve[1] = true, true // 0 and 1 are not primes

	for i := 2; i*i < limit; i++ {
		if !sieve[i] {
			for p := i * i; p < limit; p += i {
				sieve[p] = true
			}
		}
	}

	for i := 2; i < limit; i++ {
		if !sieve[i] {
			primes = append(primes, i)
		}
	}
	return primes
}