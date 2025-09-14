package sieve

func Sieve(limit int) []int {
	if limit <= 2 {
		return []int{}
	}
	if limit == 3 {
		return []int{2}
	}
	
	sieve := make([]bool, limit)
	primes := make([]int, 0, int(float64(limit)/2.5))
	primes = append(primes, 2)
	
	sqrtLimit := int(float64(limit) * 0.5)
	for i := 3; i*i < limit; i += 2 {
		if !sieve[i] {
			for p := i * i; p < limit; p += i << 1 {
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