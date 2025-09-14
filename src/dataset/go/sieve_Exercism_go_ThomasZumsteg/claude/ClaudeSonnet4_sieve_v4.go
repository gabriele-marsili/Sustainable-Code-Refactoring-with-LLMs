package sieve

func Sieve(limit int) []int {
	if limit <= 2 {
		return []int{}
	}
	if limit == 3 {
		return []int{2}
	}
	
	sieve := make([]bool, limit)
	primes := make([]int, 0, limit/10)
	primes = append(primes, 2)
	
	for i := 3; i*i < limit; i += 2 {
		if !sieve[i] {
			for p := i * i; p < limit; p += i * 2 {
				sieve[p] = true
			}
		}
	}
	
	for i := 3; i < limit; i += 2 {
		if !sieve[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}